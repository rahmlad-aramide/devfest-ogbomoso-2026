"use client";

import { Download, ImagePlus, RotateCcw, Share2 } from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { dp, dpThemes } from "@/content/dp";
import { site } from "@/content/site";
import {
  contrast,
  customTheme,
  drawDp,
  getWindow,
  loadFrameImage,
  loadPhoto,
  photoMetrics,
  type Drawable,
  type DpFonts,
} from "./render";

const noopSubscribe = () => () => {};
const canShareFiles = () =>
  typeof navigator !== "undefined" && typeof navigator.share === "function" && typeof navigator.canShare === "function";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

export function DpGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const ids = { name: useId(), zoom: useId(), x: useId(), y: useId(), bg: useId(), fg: useId() };

  const [photo, setPhoto] = useState<Drawable | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ nx: 0, ny: 0 });
  const [name, setName] = useState("");
  const [fonts, setFonts] = useState<DpFonts | null>(null);
  const [frameImage, setFrameImage] = useState<HTMLImageElement | null>(null);
  const [message, setMessage] = useState("");
  const [themeId, setThemeId] = useState<string>(dpThemes[0]!.id);
  const [custom, setCustom] = useState({ bg: dpThemes[0]!.bg[0], fg: dpThemes[0]!.text });
  const canShare = useSyncExternalStore(noopSubscribe, canShareFiles, () => false);

  // Load the site fonts (for canvas text) and any official frame artwork once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const css = getComputedStyle(document.documentElement);
      const display = css.getPropertyValue("--font-bricolage").trim() || "sans-serif";
      const sans = css.getPropertyValue("--font-geist-sans").trim() || "sans-serif";
      await Promise.all([
        document.fonts.load(`800 60px ${display}`),
        document.fonts.load(`500 30px ${sans}`),
      ]).catch(() => {});
      const frame = dp.frame ? await loadFrameImage(dp.frame.src).catch(() => null) : null;
      if (!cancelled) {
        setFonts({ display, sans });
        setFrameImage(frame);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const theme = useMemo(
    () => (themeId === "custom" ? customTheme(custom.bg, custom.fg) : (dpThemes.find((t) => t.id === themeId) ?? dpThemes[0]!)),
    [themeId, custom],
  );
  const lowContrast = contrast(theme.text, theme.bg[0]) < 3;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !fonts) return;
    drawDp(ctx, { photo, zoom, nx: pos.nx, ny: pos.ny, name, fonts, frameImage, theme });
  }, [photo, zoom, pos, name, fonts, frameImage, theme]);

  /** Switch to a custom theme, seeding whichever colour wasn't touched from the current theme. */
  function updateCustom(patch: Partial<typeof custom>) {
    setCustom({ bg: theme.bg[0], fg: theme.text, ...patch });
    setThemeId("custom");
  }

  const win = getWindow(dp.frame);
  const travel = photo ? photoMetrics(photo, win, zoom) : null;

  const addFile = useCallback(async (file: File | undefined) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("That file isn't an image. Choose a JPG, PNG or WebP photo.");
      return;
    }
    if (file.size > dp.maxFileMB * 1024 * 1024) {
      setMessage(`That photo is larger than ${dp.maxFileMB} MB. Choose a smaller one.`);
      return;
    }
    try {
      const decoded = await loadPhoto(file);
      setPhoto(decoded);
      setZoom(1);
      setPos({ nx: 0, ny: 0 });
      setMessage("Photo added. Adjust it, then download.");
    } catch {
      setMessage("We couldn't read that photo. Try a different one.");
    }
  }, []);

  const toBlob = () =>
    new Promise<Blob | null>((resolve) => canvasRef.current?.toBlob(resolve, "image/png") ?? resolve(null));

  async function download() {
    const blob = await toBlob();
    if (!blob) return setMessage("Something went wrong creating your image. Try again.");
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = dp.fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Downloaded. Share it and tag @gdgogbomoso.");
  }

  async function share() {
    const blob = await toBlob();
    if (!blob) return;
    const file = new File([blob], dp.fileName, { type: "image/png" });
    if (!navigator.canShare({ files: [file] })) return setMessage("Sharing isn't available here. Download it instead.");
    try {
      await navigator.share({ files: [file], text: dp.shareText, url: site.url });
    } catch {
      /* The person closed the share sheet. */
    }
  }

  // Mouse drag to reposition. Touch users use the sliders, so page scrolling is never blocked.
  function onPointerDown(e: React.PointerEvent) {
    if (e.pointerType === "touch" || !photo) return;
    drag.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current || !travel) return;
    const scale = dp.size / e.currentTarget.getBoundingClientRect().width;
    const dx = (e.clientX - drag.current.x) * scale;
    const dy = (e.clientY - drag.current.y) * scale;
    drag.current = { x: e.clientX, y: e.clientY };
    setPos((p) => ({
      nx: travel.travelX ? clamp(p.nx + dx / travel.travelX, -1, 1) : 0,
      ny: travel.travelY ? clamp(p.ny + dy / travel.travelY, -1, 1) : 0,
    }));
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (!photo) return;
    const step = 0.08;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    setPos((p) => ({ nx: clamp(p.nx + move[0], -1, 1), ny: clamp(p.ny + move[1], -1, 1) }));
  }

  const buttonBase =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50";
  const sliderClass = "mt-2 w-full accent-primary";
  const labelClass = "block text-sm font-semibold text-navy";

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-16">
      <div
        role="group"
        aria-label={photo ? "Your DP preview. Drag with a mouse or use the arrow keys to move your photo." : "Your DP preview"}
        tabIndex={photo ? 0 : -1}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={() => (drag.current = null)}
        onPointerCancel={() => (drag.current = null)}
        onKeyDown={onKeyDown}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void addFile(e.dataTransfer.files[0]);
        }}
        className={`mx-auto w-full max-w-xl self-start overflow-hidden rounded-3xl bg-navy shadow-float ${photo ? "cursor-grab active:cursor-grabbing" : ""}`}
      >
        <canvas
          ref={canvasRef}
          width={dp.size}
          height={dp.size}
          role="img"
          aria-label={name.trim() ? `DevFest Ogbomoso 2026 DP for ${name.trim()}` : "DevFest Ogbomoso 2026 DP preview"}
          className="block aspect-square w-full"
        />
      </div>

      <div className="space-y-8">
        <div>
          <p className={labelClass}>Your photo</p>
          <input
            ref={fileInput}
            type="file"
            accept="image/*"
            className="sr-only"
            aria-label="Choose a photo"
            onChange={(e) => {
              void addFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className={`${buttonBase} mt-2 w-full bg-primary text-white hover:bg-primary-hover sm:w-auto`}
          >
            <ImagePlus className="size-5" aria-hidden="true" />
            {photo ? "Choose a different photo" : "Choose a photo"}
          </button>
          <p className="mt-2 text-sm text-muted">Your photo stays on your device. It is never uploaded.</p>
        </div>

        <div>
          <label htmlFor={ids.name} className={labelClass}>
            Your name
          </label>
          <input
            id={ids.name}
            type="text"
            value={name}
            maxLength={dp.maxNameLength}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ada Okafor"
            className="mt-2 h-12 w-full rounded-xl border border-line bg-surface px-4 text-ink placeholder:text-muted/70"
          />
        </div>

        <fieldset>
          <legend className={labelClass}>Colours</legend>
          <div className="mt-3 flex flex-wrap gap-3">
            {dpThemes.map((t) => (
              <label key={t.id} className="cursor-pointer text-center">
                <input
                  type="radio"
                  name="dp-theme"
                  className="peer sr-only"
                  checked={themeId === t.id}
                  onChange={() => setThemeId(t.id)}
                />
                <span
                  className="grid size-14 place-items-center rounded-xl border-[3px] border-transparent font-display font-bold ring-1 ring-line peer-checked:border-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
                  style={{ background: `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})`, color: t.accent }}
                >
                  Aa
                </span>
                <span className="mt-1 block text-xs text-muted">{t.label}</span>
              </label>
            ))}
            <label className="cursor-pointer text-center">
              <input
                type="radio"
                name="dp-theme"
                className="peer sr-only"
                checked={themeId === "custom"}
                onChange={() => updateCustom({})}
              />
              <span
                className="grid size-14 place-items-center rounded-xl border-[3px] border-transparent font-display font-bold ring-1 ring-line peer-checked:border-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary"
                style={{
                  background:
                    themeId === "custom"
                      ? `linear-gradient(135deg, ${theme.bg[0]}, ${theme.bg[1]})`
                      : "conic-gradient(#ea4335, #fbbc04, #34a853, #4285f4, #ea4335)",
                  color: themeId === "custom" ? theme.text : "#ffffff",
                }}
              >
                Aa
              </span>
              <span className="mt-1 block text-xs text-muted">Custom</span>
            </label>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor={ids.bg} className={labelClass}>
                Background
              </label>
              <input
                id={ids.bg}
                type="color"
                value={theme.bg[0]}
                onChange={(e) => updateCustom({ bg: e.target.value })}
                className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-line bg-surface p-1"
              />
            </div>
            <div>
              <label htmlFor={ids.fg} className={labelClass}>
                Foreground
              </label>
              <input
                id={ids.fg}
                type="color"
                value={theme.text}
                onChange={(e) => updateCustom({ fg: e.target.value })}
                className="mt-2 h-11 w-full cursor-pointer rounded-xl border border-line bg-surface p-1"
              />
            </div>
          </div>
          <p role="status" className="mt-2 min-h-5 text-sm text-google-red-text">
            {lowContrast ? "These colours are hard to read together. Try a lighter or darker foreground." : ""}
          </p>
        </fieldset>

        <fieldset disabled={!photo} className="space-y-5 disabled:opacity-50">
          <legend className="sr-only">Adjust your photo</legend>
          <div>
            <label htmlFor={ids.zoom} className={labelClass}>
              Zoom
            </label>
            <input
              id={ids.zoom}
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className={sliderClass}
            />
          </div>
          <div>
            <label htmlFor={ids.x} className={labelClass}>
              Move left or right
            </label>
            <input
              id={ids.x}
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={pos.nx}
              disabled={!travel?.travelX}
              onChange={(e) => setPos((p) => ({ ...p, nx: Number(e.target.value) }))}
              className={sliderClass}
            />
          </div>
          <div>
            <label htmlFor={ids.y} className={labelClass}>
              Move up or down
            </label>
            <input
              id={ids.y}
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={pos.ny}
              disabled={!travel?.travelY}
              onChange={(e) => setPos((p) => ({ ...p, ny: Number(e.target.value) }))}
              className={sliderClass}
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setZoom(1);
              setPos({ nx: 0, ny: 0 });
            }}
            className="inline-flex items-center gap-2 text-sm font-semibold text-link underline underline-offset-4"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset position
          </button>
        </fieldset>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={download}
            disabled={!photo}
            className={`${buttonBase} bg-google-yellow text-navy hover:bg-[#ffcb3d]`}
          >
            <Download className="size-5" aria-hidden="true" />
            Download DP
          </button>
          {canShare ? (
            <button
              type="button"
              onClick={share}
              disabled={!photo}
              className={`${buttonBase} border border-line bg-surface text-ink hover:border-primary hover:text-primary`}
            >
              <Share2 className="size-5" aria-hidden="true" />
              Share
            </button>
          ) : null}
        </div>

        <p role="status" className="min-h-6 text-sm text-muted">
          {message}
        </p>
      </div>
    </div>
  );
}

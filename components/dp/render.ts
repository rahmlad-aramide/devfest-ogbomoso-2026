import { dp, dpThemes, type DpFrame, type DpTheme } from "@/content/dp";
import { event } from "@/content/event";
import { formatEventDate } from "@/lib/format";
import type { GlyphName } from "@/components/ui/glyph";
import { glyphPaths } from "@/components/ui/glyph-paths";

export type Drawable = ImageBitmap | HTMLImageElement;

export interface DpFonts {
  display: string;
  sans: string;
}

export interface DpInput {
  photo: Drawable | null;
  /** 1 = photo just covers the window; up to 3. */
  zoom: number;
  /** Photo position within its available travel, -1 to 1. */
  nx: number;
  ny: number;
  name: string;
  fonts: DpFonts;
  /** Loaded artwork for `dp.frame`, when configured. */
  frameImage: HTMLImageElement | null;
  theme: DpTheme;
}

// ---- Colour helpers (all colours are #rrggbb) ----

const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const toHex = (c: number[]) => `#${c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;

/** `t` of the way from colour `a` to colour `b`. */
export const mix = (a: string, b: string, t: number) => {
  const [x, y] = [rgb(a), rgb(b)];
  return toHex(x.map((v, i) => v + (y[i]! - v) * t));
};

const luminance = (hex: string) => {
  const [r, g, b] = rgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** WCAG contrast ratio, 1 to 21. */
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Build a theme from a custom background and foreground. Keeps the base theme's accent and
 * shape colours where they stay visible on the new background, and falls back to the
 * foreground colour where they wouldn't.
 */
export function customTheme(bg: string, fg: string, base: DpTheme = dpThemes[0]!): DpTheme {
  const visible = (c: string, min: number) => (contrast(c, bg) >= min ? c : fg);
  return {
    id: "custom",
    label: "Custom",
    bg: [bg, mix(bg, luminance(bg) > 0.5 ? "#000000" : "#ffffff", 0.14)],
    text: fg,
    accent: visible(base.accent, 3),
    glyphs: base.glyphs.map((g) => visible(g, 2)) as DpTheme["glyphs"],
  };
}

interface Win {
  x: number;
  y: number;
  size: number;
  shape: "circle" | "rect";
}

const PLACEHOLDER_WINDOW: Win = { x: 240, y: 155, size: 600, shape: "circle" };

/** How far (in canvas px) the photo can travel each way while still covering the window. */
export function photoMetrics(photo: Drawable, win: Win, zoom: number) {
  const base = Math.max(win.size / photo.width, win.size / photo.height);
  const w = photo.width * base * zoom;
  const h = photo.height * base * zoom;
  return { w, h, travelX: Math.max(0, (w - win.size) / 2), travelY: Math.max(0, (h - win.size) / 2) };
}

export function getWindow(frame: DpFrame | null): Win {
  return frame ? frame.window : PLACEHOLDER_WINDOW;
}

function windowPath(ctx: CanvasRenderingContext2D, win: Win) {
  ctx.beginPath();
  if (win.shape === "circle") {
    ctx.arc(win.x + win.size / 2, win.y + win.size / 2, win.size / 2, 0, Math.PI * 2);
  } else {
    ctx.rect(win.x, win.y, win.size, win.size);
  }
}

function drawGlyph(ctx: CanvasRenderingContext2D, name: GlyphName, x: number, y: number, size: number, color: string, rotate = 0) {
  ctx.save();
  ctx.translate(x + size / 2, y + size / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.translate(-size / 2, -size / 2);
  ctx.scale(size / 100, size / 100);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 15;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const { d, fill } of glyphPaths[name]) {
    const path = new Path2D(d);
    if (fill) ctx.fill(path);
    else ctx.stroke(path);
  }
  ctx.restore();
}

/** Largest font size (down to `min`) at which `text` fits in `maxWidth`. */
function fit(ctx: CanvasRenderingContext2D, text: string, family: string, weight: number, start: number, maxWidth: number, min = 26) {
  let size = start;
  ctx.font = `${weight} ${size}px ${family}`;
  while (size > min && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

function drawPhoto(ctx: CanvasRenderingContext2D, input: DpInput, win: Win) {
  ctx.save();
  windowPath(ctx, win);
  ctx.clip();
  if (input.photo) {
    const { w, h, travelX, travelY } = photoMetrics(input.photo, win, input.zoom);
    const cx = win.x + win.size / 2 + input.nx * travelX;
    const cy = win.y + win.size / 2 + input.ny * travelY;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(input.photo, cx - w / 2, cy - h / 2, w, h);
  } else {
    const { text } = input.theme;
    ctx.globalAlpha = 0.12;
    ctx.fillStyle = text;
    ctx.fillRect(win.x, win.y, win.size, win.size);
    ctx.globalAlpha = 0.6;
    drawGlyph(ctx, "plus", win.x + win.size / 2 - 40, win.y + win.size / 2 - 70, 80, text);
    ctx.globalAlpha = 0.75;
    ctx.fillStyle = text;
    ctx.font = `500 34px ${input.fonts.sans}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Add your photo", win.x + win.size / 2, win.y + win.size / 2 + 60);
    ctx.globalAlpha = 1;
  }
  ctx.restore();
}

function fillBackground(ctx: CanvasRenderingContext2D, theme: DpTheme) {
  const S = dp.size;
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, theme.bg[0]);
  bg.addColorStop(1, theme.bg[1]);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);
}

/** Built-in placeholder frame, used until official artwork is set in content/dp.ts. */
function drawPlaceholderFrame(ctx: CanvasRenderingContext2D, input: DpInput, win: Win) {
  const S = dp.size;
  const { theme } = input;
  const [brace, chevron, slash, green] = theme.glyphs;
  fillBackground(ctx, theme);

  drawGlyph(ctx, "brace-left", 40, 40, 150, brace, -8);
  drawGlyph(ctx, "chevron-left", 860, 30, 120, chevron, 0);
  drawGlyph(ctx, "plus", 930, 250, 80, chevron, 12);
  drawGlyph(ctx, "slash", 30, 330, 110, slash, 10);
  drawGlyph(ctx, "chevron-right", 900, 560, 110, green, 0);
  drawGlyph(ctx, "semicolon", 60, 590, 100, green, -8);

  // Photo, then the ring around it.
  drawPhoto(ctx, input, win);
  ctx.beginPath();
  ctx.arc(win.x + win.size / 2, win.y + win.size / 2, win.size / 2 + 8, 0, Math.PI * 2);
  ctx.lineWidth = 16;
  ctx.strokeStyle = theme.accent;
  ctx.stroke();

  // Text block, centred.
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const name = input.name.trim();
  ctx.fillStyle = theme.text;
  ctx.globalAlpha = 0.8;
  ctx.font = `500 34px ${input.fonts.sans}`;
  ctx.fillText("I'm attending", S / 2, 838);

  ctx.globalAlpha = 1;
  fit(ctx, event.fullName, input.fonts.display, 800, 76, 940);
  ctx.fillText(event.fullName, S / 2, 918);

  if (name) {
    ctx.fillStyle = theme.accent;
    fit(ctx, name, input.fonts.display, 800, 60, 900);
    ctx.fillText(name, S / 2, 990);
  }
  ctx.fillStyle = theme.text;
  ctx.globalAlpha = 0.75;
  ctx.font = `500 30px ${input.fonts.sans}`;
  ctx.fillText(`${formatEventDate()} · ${event.venue.city}`, S / 2, name ? 1040 : 990);
  ctx.globalAlpha = 1;
}

/** Official artwork mode: photo underneath, transparent frame PNG on top, optional name. */
function drawArtworkFrame(ctx: CanvasRenderingContext2D, input: DpInput, frame: DpFrame, image: HTMLImageElement) {
  const S = dp.size;
  fillBackground(ctx, input.theme);
  drawPhoto(ctx, input, frame.window);
  ctx.drawImage(image, 0, 0, S, S);

  const name = input.name.trim();
  if (name && frame.name) {
    ctx.fillStyle = frame.name.color ?? input.theme.text;
    ctx.textAlign = frame.name.align;
    ctx.textBaseline = "alphabetic";
    fit(ctx, name, input.fonts.display, 800, 60, frame.name.maxWidth);
    ctx.fillText(name, frame.name.x, frame.name.y);
  }
}

export function drawDp(ctx: CanvasRenderingContext2D, input: DpInput) {
  const frame = dp.frame;
  ctx.clearRect(0, 0, dp.size, dp.size);
  if (frame && input.frameImage) drawArtworkFrame(ctx, input, frame, input.frameImage);
  else drawPlaceholderFrame(ctx, input, PLACEHOLDER_WINDOW);
}

export async function loadFrameImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Could not load frame artwork: ${src}`));
    img.src = src;
  });
}

/** Decode an uploaded file, honouring EXIF orientation where the browser supports it. */
export async function loadPhoto(file: File): Promise<Drawable> {
  try {
    return await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

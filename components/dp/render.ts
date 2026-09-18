import { dp, type DpFrame } from "@/content/dp";
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
}

const NAVY = "#0b1f4d";
const YELLOW = "#fbbc04";
const COLORS = { blue: "#4285f4", red: "#ea4335", yellow: YELLOW, green: "#34a853" };

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
    ctx.fillStyle = "rgba(255,255,255,0.10)";
    ctx.fillRect(win.x, win.y, win.size, win.size);
    drawGlyph(ctx, "plus", win.x + win.size / 2 - 40, win.y + win.size / 2 - 70, 80, "rgba(255,255,255,0.55)");
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.font = `500 34px ${input.fonts.sans}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.fillText("Add your photo", win.x + win.size / 2, win.y + win.size / 2 + 60);
  }
  ctx.restore();
}

/** Built-in placeholder frame, used until official artwork is set in content/dp.ts. */
function drawPlaceholderFrame(ctx: CanvasRenderingContext2D, input: DpInput, win: Win) {
  const S = dp.size;
  const bg = ctx.createLinearGradient(0, 0, S, S);
  bg.addColorStop(0, NAVY);
  bg.addColorStop(1, "#153b93");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, S, S);

  drawGlyph(ctx, "brace-left", 40, 40, 150, COLORS.yellow, -8);
  drawGlyph(ctx, "chevron-left", 860, 30, 120, COLORS.blue, 0);
  drawGlyph(ctx, "plus", 930, 250, 80, COLORS.blue, 12);
  drawGlyph(ctx, "slash", 30, 330, 110, COLORS.red, 10);
  drawGlyph(ctx, "chevron-right", 900, 560, 110, COLORS.green, 0);
  drawGlyph(ctx, "semicolon", 60, 590, 100, COLORS.green, -8);

  // Photo, then the ring around it.
  drawPhoto(ctx, input, win);
  ctx.beginPath();
  ctx.arc(win.x + win.size / 2, win.y + win.size / 2, win.size / 2 + 8, 0, Math.PI * 2);
  ctx.lineWidth = 16;
  ctx.strokeStyle = YELLOW;
  ctx.stroke();

  // Text block, centred.
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  const name = input.name.trim();
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.font = `500 34px ${input.fonts.sans}`;
  ctx.fillText("I'm attending", S / 2, 838);

  ctx.fillStyle = "#ffffff";
  fit(ctx, event.fullName, input.fonts.display, 800, 76, 940);
  ctx.fillText(event.fullName, S / 2, 918);

  if (name) {
    ctx.fillStyle = YELLOW;
    fit(ctx, name, input.fonts.display, 800, 60, 900);
    ctx.fillText(name, S / 2, 990);
  }
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.font = `500 30px ${input.fonts.sans}`;
  ctx.fillText(`${formatEventDate()} · ${event.venue.city}`, S / 2, name ? 1040 : 990);
}

/** Official artwork mode: photo underneath, transparent frame PNG on top, optional name. */
function drawArtworkFrame(ctx: CanvasRenderingContext2D, input: DpInput, frame: DpFrame, image: HTMLImageElement) {
  const S = dp.size;
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, S, S);
  drawPhoto(ctx, input, frame.window);
  ctx.drawImage(image, 0, 0, S, S);

  const name = input.name.trim();
  if (name && frame.name) {
    ctx.fillStyle = frame.name.color;
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

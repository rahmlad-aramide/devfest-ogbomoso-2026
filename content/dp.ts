/**
 * DP (display picture) generator settings.
 *
 * TODO(2026): official 2026 frame artwork. Until then `frame` is null and a placeholder frame
 * is drawn in code from the event data. To use the official artwork:
 *   1. Export a transparent PNG at `size`×`size` (default 1080×1080) with a hole where the photo goes.
 *   2. Save it under /public/images/ and set `frame` below, e.g.
 *      frame: {
 *        src: "/images/dp-frame-2026.png",
 *        window: { x: 190, y: 190, size: 700, shape: "circle" },   // the photo hole, in canvas px
 *        name: { x: 540, y: 960, maxWidth: 800, align: "center" }, // optional; `color` defaults to the chosen foreground
 *      },
 */
export interface DpFrame {
  src: string;
  window: { x: number; y: number; size: number; shape: "circle" | "rect" };
  /** Where to print the attendee's name on the artwork. Omit to skip the name. */
  name?: { x: number; y: number; maxWidth: number; color?: string; align: CanvasTextAlign };
}

/**
 * A colour theme for the DP. The background is what sits behind the photo; the foreground is
 * the text, the ring around the photo and the shapes on top of it. With official artwork,
 * the background only shows through transparent areas and the foreground colours the name.
 * Colours are #rrggbb.
 */
export interface DpTheme {
  id: string;
  label: string;
  /** Background gradient, top-left to bottom-right. */
  bg: [string, string];
  /** Main text colour. */
  text: string;
  /** Ring around the photo and the attendee's name. */
  accent: string;
  /** Shape colours, in order: braces, chevrons and plus, slash, semicolon and right chevron. */
  glyphs: [string, string, string, string];
}

export const dpThemes: DpTheme[] = [
  { id: "navy", label: "Navy", bg: ["#0b1f4d", "#153b93"], text: "#ffffff", accent: "#fbbc04", glyphs: ["#fbbc04", "#4285f4", "#ea4335", "#34a853"] },
  { id: "blue", label: "Blue", bg: ["#1a56db", "#4285f4"], text: "#ffffff", accent: "#fbbc04", glyphs: ["#fbbc04", "#ffffff", "#0b1f4d", "#34d399"] },
  { id: "green", label: "Green", bg: ["#0d652d", "#188038"], text: "#ffffff", accent: "#fbbc04", glyphs: ["#fbbc04", "#ffffff", "#f28b82", "#8ab4f8"] },
  { id: "sunny", label: "Sunny", bg: ["#fbbc04", "#ffd75e"], text: "#0b1f4d", accent: "#0b1f4d", glyphs: ["#0b1f4d", "#1a56db", "#c5221f", "#0d652d"] },
  { id: "light", label: "Light", bg: ["#f5f8ff", "#dbe8fd"], text: "#0b1b3a", accent: "#1a73e8", glyphs: ["#f9ab00", "#1a73e8", "#ea4335", "#188038"] },
];

export const dp = {
  size: 1080,
  frame: null as DpFrame | null,
  fileName: "devfest-ogbomoso-2026-dp.png",
  maxNameLength: 32,
  maxFileMB: 15,
  shareText: "I'm attending DevFest Ogbomoso 2026! Get your DP and RSVP:",
} as const;

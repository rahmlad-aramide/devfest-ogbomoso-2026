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
 *        name: { x: 540, y: 960, maxWidth: 800, color: "#ffffff", align: "center" }, // optional
 *      },
 */
export interface DpFrame {
  src: string;
  window: { x: number; y: number; size: number; shape: "circle" | "rect" };
  /** Where to print the attendee's name on the artwork. Omit to skip the name. */
  name?: { x: number; y: number; maxWidth: number; color: string; align: CanvasTextAlign };
}

export const dp = {
  size: 1080,
  frame: null as DpFrame | null,
  fileName: "devfest-ogbomoso-2026-dp.png",
  maxNameLength: 32,
  maxFileMB: 15,
  shareText: "I'm attending DevFest Ogbomoso 2026! Get your DP and RSVP:",
} as const;

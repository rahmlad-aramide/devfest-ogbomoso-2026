import type { GlyphName } from "./glyph";

export interface GlyphPath {
  d: string;
  /** Solid shape (a dot) rather than a stroked line. */
  fill?: boolean;
}

/** SVG path data on a 100×100 grid, shared by the <Glyph> component and the DP canvas. */
export const glyphPaths: Record<GlyphName, GlyphPath[]> = {
  "chevron-left": [{ d: "M62 18 28 50l34 32" }],
  "chevron-right": [{ d: "m38 18 34 32-34 32" }],
  slash: [{ d: "M64 14 36 86" }],
  "double-slash": [{ d: "M50 14 30 86M78 14 58 86" }],
  semicolon: [{ d: "M41 30a9 9 0 1 0 18 0a9 9 0 1 0-18 0Z", fill: true }, { d: "M50 64c0 12-4 18-10 24" }],
  plus: [{ d: "M50 20v60M20 50h60" }],
  equals: [{ d: "M22 36h56M22 64h56" }],
  "brace-left": [{ d: "M64 14c-16 0-20 6-20 18v8c0 6-6 10-14 10 8 0 14 4 14 10v8c0 12 4 18 20 18" }],
  "brace-right": [{ d: "M36 14c16 0 20 6 20 18v8c0 6 6 10 14 10-8 0-14 4-14 10v8c0 12-4 18-20 18" }],
};

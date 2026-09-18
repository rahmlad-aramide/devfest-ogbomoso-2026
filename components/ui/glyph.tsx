import { cn } from "@/lib/cn";
import { glyphPaths } from "./glyph-paths";

export type GlyphName =
  | "chevron-left"
  | "chevron-right"
  | "slash"
  | "double-slash"
  | "semicolon"
  | "plus"
  | "equals"
  | "brace-left"
  | "brace-right";

/**
 * DevFest's visual vocabulary is code punctuation. These are flat, thick-stroke glyphs that
 * take their colour from `currentColor`, so colour them with a text-* class.
 */

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={15}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className ?? "size-12"}
    >
      {glyphPaths[name].map(({ d, fill }) =>
        fill ? <path key={d} d={d} fill="currentColor" stroke="none" /> : <path key={d} d={d} />,
      )}
    </svg>
  );
}

const strip: Array<[GlyphName, string]> = [
  ["brace-left", "text-google-yellow"],
  ["chevron-left", "text-google-blue"],
  ["slash", "text-google-red"],
  ["semicolon", "text-google-green"],
  ["double-slash", "text-google-yellow"],
  ["plus", "text-google-blue"],
  ["chevron-right", "text-google-green"],
  ["equals", "text-google-red"],
  ["brace-right", "text-google-yellow"],
];

/** A decorative row of glyphs. Hidden from assistive tech. */
export function GlyphStrip({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-between gap-2 overflow-hidden", className)}
    >
      {strip.map(([name, color], i) => (
        <Glyph key={i} name={name} className={cn("size-9 shrink-0 sm:size-12", color, i > 5 && "max-sm:hidden")} />
      ))}
    </div>
  );
}

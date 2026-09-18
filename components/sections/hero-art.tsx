"use client";

import { motion, useReducedMotion } from "motion/react";
import { Glyph, type GlyphName } from "@/components/ui/glyph";

interface Piece {
  name: GlyphName;
  color: string;
  left: number;
  top: number;
  width: number;
  rotate: number;
}

// Positions are percentages of the square stage.
const pieces: Piece[] = [
  { name: "brace-left", color: "text-google-yellow", left: 2, top: 14, width: 36, rotate: -6 },
  { name: "chevron-left", color: "text-google-blue", left: 36, top: 0, width: 30, rotate: 0 },
  { name: "plus", color: "text-google-blue", left: 74, top: 8, width: 18, rotate: 12 },
  { name: "slash", color: "text-google-red", left: 44, top: 26, width: 30, rotate: 10 },
  { name: "brace-right", color: "text-google-yellow", left: 62, top: 46, width: 36, rotate: 6 },
  { name: "chevron-right", color: "text-google-green", left: 14, top: 56, width: 30, rotate: 0 },
  { name: "semicolon", color: "text-google-green", left: 48, top: 62, width: 20, rotate: -8 },
  { name: "equals", color: "text-google-red", left: 30, top: 82, width: 22, rotate: 0 },
];

/** The one orchestrated motion on the site: the glyphs spring into place once, on load. */
export function HeroArt() {
  const reduce = useReducedMotion();

  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-xs lg:max-w-md">
      {pieces.map((p, i) => (
        <motion.div
          key={p.name}
          className="absolute"
          style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.width}%` }}
          initial={reduce ? false : { opacity: 0, scale: 0.4, y: 30, rotate: p.rotate - 28 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: p.rotate }}
          transition={{ type: "spring", stiffness: 170, damping: 13, delay: 0.1 + i * 0.09 }}
        >
          <Glyph name={p.name} className={`block h-auto w-full ${p.color}`} />
        </motion.div>
      ))}
    </div>
  );
}

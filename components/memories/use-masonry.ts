"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Photo } from "@/content/past-editions";

interface Measurement {
  width: number;
  columns: number;
  gap: number;
}

/** Place each photo into the shortest column, preserving the position of earlier photos on append. */
export function useMasonry(photos: Photo[], enabled: boolean) {
  const listRef = useRef<HTMLUListElement>(null);
  const [measurement, setMeasurement] = useState<Measurement | null>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!enabled || !list) return;

    const measure = () => {
      const style = getComputedStyle(list);
      const next = {
        width: list.getBoundingClientRect().width,
        columns: Number(style.getPropertyValue("--masonry-columns")),
        gap: parseFloat(style.columnGap),
      };
      if (next.width <= 0 || !Number.isInteger(next.columns) || next.columns < 1 || !Number.isFinite(next.gap)) return;
      setMeasurement((previous) => previous
        && previous.width === next.width
        && previous.columns === next.columns
        && previous.gap === next.gap ? previous : next);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    // A breakpoint can change columns even when a max-width container stays the same width.
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [enabled]);

  const positions = enabled && measurement ? (() => {
    const { width, columns, gap } = measurement;
    const columnWidth = (width - gap * (columns - 1)) / columns;
    const heights = Array<number>(columns).fill(0);

    return photos.map((photo) => {
      const column = heights.indexOf(Math.min(...heights));
      const row = heights[column];
      const span = Math.ceil(columnWidth * photo.height / photo.width) + gap;
      heights[column] += span;
      return { gridColumn: column + 1, gridRow: `${row + 1} / span ${span}` };
    });
  })() : null;

  return { listRef, positions };
}

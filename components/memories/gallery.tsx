"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/past-editions";

/** Photo grid with a native <dialog> lightbox: Esc closes, arrow keys move, backdrop click closes. */
export function Gallery({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
  const photo = index === null ? null : photos[index];

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <li key={p.src}>
            <figure>
              <button
                type="button"
                aria-label={`View larger: ${p.caption}`}
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setIndex(i);
                }}
                className="block w-full overflow-hidden rounded-2xl"
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={1600}
                  height={1067}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none"
                />
              </button>
              <figcaption className="mt-3 text-sm text-muted">{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-[92vh] w-[min(92vw,1100px)] rounded-2xl bg-navy-deep p-0 text-white backdrop:bg-black/80"
      >
        {photo ? (
          <div className="relative flex flex-col">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={1600}
              height={1067}
              sizes="92vw"
              className="h-auto max-h-[78vh] w-full object-contain"
            />
            <p className="px-5 py-4 text-sm text-white/85">{photo.caption}</p>
            <button
              type="button"
              autoFocus
              aria-label="Close viewer"
              onClick={() => setIndex(null)}
              className="absolute top-3 right-3 grid size-10 place-items-center rounded-full bg-navy-deep/80 hover:bg-primary"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => step(-1)}
              className="absolute top-[38%] left-3 grid size-10 place-items-center rounded-full bg-navy-deep/80 hover:bg-primary"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => step(1)}
              className="absolute top-[38%] right-3 grid size-10 place-items-center rounded-full bg-navy-deep/80 hover:bg-primary"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

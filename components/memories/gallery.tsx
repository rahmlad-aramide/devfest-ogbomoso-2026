"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Photo } from "@/content/past-editions";
import { cn } from "@/lib/cn";
import { useMasonry } from "./use-masonry";
import styles from "./masonry.module.css";

/** Grid or masonry photos with a native dialog lightbox and keyboard navigation. */
export function Gallery({ photos, layout = "grid", initialCount, label = "gallery" }: {
  photos: Photo[];
  layout?: "grid" | "masonry";
  initialCount?: number;
  label?: string;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const captionId = useId();
  const listId = useId();
  const firstAdditionalPhoto = useRef<HTMLButtonElement>(null);
  const visiblePhotos = expanded || !initialCount ? photos : photos.slice(0, initialCount);
  const canExpand = visiblePhotos.length < photos.length;
  const isOpen = index !== null;
  const masonry = layout === "masonry";
  const { listRef, positions } = useMasonry(visiblePhotos, masonry);

  useEffect(() => {
    if (expanded) firstAdditionalPhoto.current?.focus();
  }, [expanded]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  const step = (delta: number) =>
    setIndex((i) => (i === null ? i : (i + delta + visiblePhotos.length) % visiblePhotos.length));
  const photo = index === null ? null : photos[index];

  return (
    <>
      <ul
        ref={listRef}
        id={listId}
        className={masonry ? cn(
          styles.masonry,
          positions && styles.positioned,
        ) : "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"}
      >
        {visiblePhotos.map((p, i) => {
          const reveal = canExpand && i === visiblePhotos.length - 1;
          return (
            <li
              key={p.src}
              style={positions?.[i]}
              className={cn(masonry && !positions && styles.fallbackItem)}
            >
              <figure className={cn(masonry && "group relative")}>
                <button
                  type="button"
                  ref={i === initialCount ? firstAdditionalPhoto : undefined}
                  aria-label={reveal ? `View more: ${photos.length - visiblePhotos.length} more photos from ${label}` : `View larger: ${p.caption}`}
                  aria-haspopup={reveal ? undefined : "dialog"}
                  aria-expanded={reveal ? false : undefined}
                  aria-controls={reveal ? listId : undefined}
                  onClick={(e) => {
                    if (reveal) {
                      setExpanded(true);
                      return;
                    }
                    opener.current = e.currentTarget;
                    setIndex(i);
                  }}
                  className="relative block w-full overflow-hidden rounded-2xl bg-surface-2 transition-opacity hover:opacity-90 motion-reduce:transition-none"
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes={masonry
                      ? "(min-width: 1152px) 260px, (min-width: 1024px) calc((100vw - 112px) / 4), (min-width: 640px) calc((100vw - 80px) / 3), calc((100vw - 44px) / 2)"
                      : "(min-width: 1152px) 347px, (min-width: 1024px) calc((100vw - 112px) / 3), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)"}
                    className={cn("block w-full", masonry ? "h-auto" : "aspect-[3/2] object-cover transition-transform duration-300 hover:scale-[1.03] motion-reduce:transition-none")}
                  />
                  {reveal ? (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-navy-deep/70 px-3 text-white">
                      <span className="font-display text-lg font-bold sm:text-xl">View more</span>
                      <span className="text-xs sm:text-sm">+{photos.length - visiblePhotos.length} photos</span>
                    </span>
                  ) : null}
                </button>
                <figcaption className={reveal ? "sr-only" : masonry
                  ? "pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-navy-deep/85 px-3 py-3 text-xs leading-relaxed text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none sm:text-sm"
                  : "mt-3 text-sm text-muted"}>{p.caption}</figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
      <p role="status" className="sr-only">
        Showing {visiblePhotos.length} of {photos.length} photos from {label}.
      </p>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        aria-describedby={photo ? captionId : undefined}
        onClose={() => {
          setIndex(null);
          opener.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) setIndex(null);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            step(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
        className="m-auto max-h-[92svh] w-[min(92vw,1100px)] rounded-2xl bg-navy-deep p-0 text-white backdrop:bg-black/80"
      >
        {photo ? (
          <div className="flex flex-col">
            <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-2">
              <p className="px-2 text-sm text-white/85">{(index ?? 0) + 1} / {visiblePhotos.length}</p>
              <button
                type="button"
                autoFocus
                aria-label="Close viewer"
                onClick={() => setIndex(null)}
                className="grid size-11 place-items-center rounded-full hover:bg-primary"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="relative">
              <Image
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(min-width: 1196px) 1100px, 92vw"
                className="block h-auto max-h-[calc(92svh-10rem)] w-full object-contain"
              />
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => step(-1)}
                disabled={photos.length < 2}
                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/80 hover:bg-primary disabled:hidden"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => step(1)}
                disabled={photos.length < 2}
                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-navy-deep/80 hover:bg-primary disabled:hidden"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
            <p
              id={captionId}
              aria-live="polite"
              aria-atomic="true"
              className="max-h-[25svh] shrink-0 overflow-y-auto px-5 py-4 text-sm text-white/85"
            >
              {photo.caption}
            </p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

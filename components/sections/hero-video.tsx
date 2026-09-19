"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { recapVideo } from "@/content/past-editions";

/**
 * Decides whether the background video should play. The video is decorative and 2 MB+, so it
 * is skipped when the visitor asks for reduced motion, has Data Saver on, or is on a 2G/3G-speed
 * connection (`effectiveType`, which fires far more often than the opt-in Data Saver), and it only starts
 * a moment after the page has loaded, so it never competes with the hero image and fonts, and it
 * fades in over the still photo once frames are actually playing.
 */
const START_DELAY_MS = 2500;

type Connection = { saveData?: boolean; effectiveType?: string };

function subscribe(onChange: () => void) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  motion.addEventListener("change", onChange);
  window.addEventListener("load", onChange);
  return () => {
    motion.removeEventListener("change", onChange);
    window.removeEventListener("load", onChange);
  };
}

function canPlay() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = (navigator as Navigator & { connection?: Connection }).connection;
  const constrained = connection?.saveData === true || /^(slow-)?2g$|^3g$/.test(connection?.effectiveType ?? "");
  return document.readyState === "complete" && !reduceMotion && !constrained;
}

export function HeroVideo() {
  const allowed = useSyncExternalStore(subscribe, canPlay, () => false);
  const [delayed, setDelayed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!allowed) return;
    const timer = setTimeout(() => setDelayed(true), START_DELAY_MS);
    return () => clearTimeout(timer);
  }, [allowed]);

  if (!allowed || !delayed) return null;

  return (
    <video
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 -z-20 size-full object-cover object-center transition-opacity duration-1000 ${
        playing ? "opacity-100" : "opacity-0"
      }`}
    >
      <source src={recapVideo.src} type="video/mp4" />
    </video>
  );
}

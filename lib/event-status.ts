import { event } from "@/content/event";

export type EventPhase = "upcoming" | "live" | "ended";

const startMs = Date.parse(event.start);
const endMs = Date.parse(event.end);

/** Instants (ms) at which the phase changes. */
export const phaseBoundaries = [startMs, endMs];

/** Derived purely from the ISO instants in content/event.ts. */
export function getEventPhase(now: number = Date.now()): EventPhase {
  if (now < startMs) return "upcoming";
  if (now <= endMs) return "live";
  return "ended";
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeLeft(now: number = Date.now()): TimeLeft {
  const diff = Math.max(0, startMs - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

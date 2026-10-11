import { event } from "@/content/event";

export type EventPhase = "upcoming" | "live" | "ended";

/** The event runs over two days: it starts with day 1 and ends with day 2 (`event.end`). */
const startMs = Date.parse(event.days[0].start);
const endMs = Date.parse(event.end);
/** The countdown targets the main conference (day 2), `event.start`. */
const mainDayMs = Date.parse(event.start);
const dayRanges = event.days.map((d) => [Date.parse(d.start), Date.parse(d.end)] as const);

/** Instants (ms) at which the phase changes. */
export const phaseBoundaries = [startMs, endMs];

/** Derived purely from the ISO instants in content/event.ts. */
export function getEventPhase(now: number = Date.now()): EventPhase {
  if (now < startMs) return "upcoming";
  if (now <= endMs) return "live";
  return "ended";
}

/** The day (1 or 2) currently in progress, or null between days and outside the event. */
export function getLiveDay(now: number = Date.now()): 1 | 2 | null {
  const i = dayRanges.findIndex(([start, end]) => now >= start && now <= end);
  return i === -1 ? null : ((i + 1) as 1 | 2);
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeLeft(now: number = Date.now()): TimeLeft {
  const diff = Math.max(0, mainDayMs - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1000),
  };
}

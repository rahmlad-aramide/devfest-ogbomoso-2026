"use client";

import { useSyncExternalStore } from "react";
import { getEventPhase, phaseBoundaries, type EventPhase } from "@/lib/event-status";

const MAX_TIMEOUT = 2_147_483_647;

/** Wakes subscribers only when the phase can change (event start and end), not every second. */
function subscribe(onChange: () => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    const now = Date.now();
    const next = phaseBoundaries.find((t) => t > now);
    if (next === undefined) return;
    timer = setTimeout(() => {
      onChange();
      schedule();
    }, Math.min(next - now + 50, MAX_TIMEOUT));
  };
  schedule();
  return () => clearTimeout(timer);
}

/** Current event phase. "upcoming" during server render, so server and client markup match. */
export function useEventPhase(): EventPhase {
  return useSyncExternalStore(subscribe, () => getEventPhase(), () => "upcoming");
}

/** Renders its children only once the event has finished. */
export function WhenEnded({ children }: { children: React.ReactNode }) {
  return useEventPhase() === "ended" ? <>{children}</> : null;
}

/** Renders its children until the event has finished. */
export function UnlessEnded({ children }: { children: React.ReactNode }) {
  return useEventPhase() === "ended" ? null : <>{children}</>;
}

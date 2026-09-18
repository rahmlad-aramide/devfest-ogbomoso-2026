"use client";

import { useSyncExternalStore } from "react";

let snapshot = 0;
const read = () => Math.floor(Date.now() / 1000) * 1000;

function subscribe(onChange: () => void) {
  snapshot = read();
  const id = setInterval(() => {
    snapshot = read();
    onChange();
  }, 1000);
  return () => clearInterval(id);
}

const getSnapshot = () => snapshot || (snapshot = read());
const getServerSnapshot = () => null;

/**
 * Current time in ms, ticking every second. Returns `null` during server render and the
 * first client render, so markup that depends on the clock never causes a hydration mismatch.
 */
export function useNow(): number | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

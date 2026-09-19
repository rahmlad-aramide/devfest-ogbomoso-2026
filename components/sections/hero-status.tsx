"use client";

import { ButtonLink } from "@/components/ui/button";
import { useEventPhase } from "@/components/ui/event-phase";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { event } from "@/content/event";
import { getEventPhase, getTimeLeft } from "@/lib/event-status";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import { useNow } from "@/lib/use-now";

const units = ["days", "hours", "minutes", "seconds"] as const;

/**
 * `HeroCountdown` reads the ticking clock through `useNow`, which is `null` until the client has mounted.
 * Until then it renders the "upcoming" state with placeholder digits, so server and client markup match.
 * `HeroActions` only needs the phase, which changes at most twice, so it does not re-render every second.
 */

export function HeroActions() {
  const ended = useEventPhase() === "ended";

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {ended ? (
        <ButtonLink href="/#throwback" variant="accent" size="lg">
          See past highlights
        </ButtonLink>
      ) : (
        <RsvpButton variant="accent" size="lg" />
      )}
      <ButtonLink href="/#about" variant="outline-inverse" size="lg">
        What to expect
      </ButtonLink>
    </div>
  );
}

export function HeroCountdown() {
  const now = useNow();
  const phase = now === null ? "upcoming" : getEventPhase(now);
  const left = now === null ? null : getTimeLeft(now);

  if (phase === "live") {
    return <p className="font-display text-3xl font-extrabold text-google-yellow sm:text-4xl">It&apos;s happening today.</p>;
  }
  if (phase === "ended") {
    return (
      <p className="max-w-sm font-display text-2xl font-bold text-white">
        Thank you for making {event.fullName} unforgettable. See you next year.
      </p>
    );
  }

  return (
    <div>
      <p className="sr-only">
        {event.fullName} starts on {formatEventDate()}, {formatEventTimeRange()}.
      </p>
      <div aria-hidden="true" className="flex gap-5 sm:gap-8">
        {units.map((unit) => (
          <div key={unit} className="min-w-14 sm:min-w-20">
            <div className="font-display text-5xl font-extrabold tabular-nums sm:text-6xl">
              {left ? String(left[unit]).padStart(2, "0") : "––"}
            </div>
            <div className="mt-1 text-sm text-white/65">{unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

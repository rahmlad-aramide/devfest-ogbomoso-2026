"use client";

import { event } from "@/content/event";
import { ButtonLink, type ButtonLinkProps } from "./button";
import { useEventPhase } from "./event-phase";

/**
 * The one RSVP call to action. Every RSVP button on the site goes through here.
 * Once the event has finished it becomes a link to the memories page instead.
 * `href` defaults to `event.rsvpUrl`; the hero's day cards pass their own day's RSVP link.
 */
export function RsvpButton({ href = event.rsvpUrl, ...props }: Partial<Omit<ButtonLinkProps, "external">>) {
  const ended = useEventPhase() === "ended";

  if (ended) {
    return (
      <ButtonLink href="/memories" {...props}>
        See the memories
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={href} external {...props}>
      {props.children ?? event.rsvpLabel}
    </ButtonLink>
  );
}

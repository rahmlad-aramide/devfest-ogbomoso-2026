"use client";

import { event } from "@/content/event";
import { ButtonLink, type ButtonLinkProps } from "./button";
import { useEventPhase } from "./event-phase";

/**
 * The one RSVP call to action. Every RSVP button on the site goes through here.
 * Once the event has finished it becomes a link to the memories page instead.
 */
export function RsvpButton(props: Partial<Omit<ButtonLinkProps, "href" | "external">>) {
  const ended = useEventPhase() === "ended";

  if (ended) {
    return (
      <ButtonLink href="/memories" {...props}>
        See the memories
      </ButtonLink>
    );
  }
  return (
    <ButtonLink href={event.rsvpUrl} external {...props}>
      {props.children ?? event.rsvpLabel}
    </ButtonLink>
  );
}

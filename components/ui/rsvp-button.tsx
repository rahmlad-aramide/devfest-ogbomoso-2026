import { event } from "@/content/event";
import { ButtonLink, type ButtonLinkProps } from "./button";

/** The one RSVP call to action. Every RSVP button on the site goes through here. */
export function RsvpButton(props: Partial<Omit<ButtonLinkProps, "href" | "external">>) {
  return (
    <ButtonLink href={event.rsvpUrl} external {...props}>
      {props.children ?? event.rsvpLabel}
    </ButtonLink>
  );
}

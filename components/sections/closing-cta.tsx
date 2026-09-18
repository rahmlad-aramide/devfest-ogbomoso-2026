import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { event } from "@/content/event";
import { cityLabel, formatEventDate, venueLabel } from "@/lib/format";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-primary py-20 text-white sm:py-28">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            There&apos;s a seat for you.
          </h2>
          <p className="mt-4 text-lg text-white/85">
            {formatEventDate()} in {cityLabel()}. {venueLabel()}.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 self-start md:self-auto">
          <RsvpButton variant="inverse" size="lg">
            {event.rsvpLabel}
          </RsvpButton>
          <ButtonLink href="/dp" variant="outline-inverse" size="lg">
            Create your DP
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

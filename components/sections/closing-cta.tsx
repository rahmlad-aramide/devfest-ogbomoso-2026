import { Container } from "@/components/ui/container";
import { UnlessEnded, WhenEnded } from "@/components/ui/event-phase";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { event } from "@/content/event";
import { cityLabel, formatEventDate, venueLabel } from "@/lib/format";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-primary py-20 text-white sm:py-28">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 id="cta-title" className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            <UnlessEnded>There&apos;s a seat for you.</UnlessEnded>
            <WhenEnded>Thank you for joining us.</WhenEnded>
          </h2>
          <p className="mt-4 text-lg text-white">
            <UnlessEnded>
              {formatEventDate()} in {cityLabel()}. {venueLabel()}.
            </UnlessEnded>
            <WhenEnded>{event.fullName} has wrapped. Follow GDG Ogbomoso to hear about what&apos;s next.</WhenEnded>
          </p>
        </div>
        <RsvpButton variant="inverse" size="lg" className="self-start md:self-auto">
          {event.rsvpLabel}
        </RsvpButton>
      </Container>
    </section>
  );
}

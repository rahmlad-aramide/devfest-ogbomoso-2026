import Link from "next/link";
import { PastSpeakerCard, SpeakerCard } from "@/components/speakers/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/content/event";
import { speakers2025 } from "@/content/past-editions";
import { speakers } from "@/content/speakers";

const PREVIEW_COUNT = 8;

export function Speakers() {
  const published = event.sections.speakers === "published" && speakers.length > 0;

  return (
    <section id="speakers" aria-labelledby="speakers-title" className="bg-surface py-20 sm:py-28">
      <Container>
        {published ? (
          <>
            <SectionHeading id="speakers-title" title="Meet the speakers" description="The people taking the stage on the day." />
            <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {speakers.slice(0, PREVIEW_COUNT).map((s) => (
                <li key={s.id}>
                  <SpeakerCard speaker={s} />
                </li>
              ))}
            </ul>
            {speakers.length > PREVIEW_COUNT ? (
              <Link href="/speakers" className="mt-10 inline-block font-semibold text-primary underline underline-offset-4">
                See all speakers
              </Link>
            ) : null}
          </>
        ) : (
          <>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading
                id="speakers-title"
                title="Speakers will be announced soon"
                description="We're finalising the DevFest 2026 lineup. RSVP to be first to hear, and see who took the stage last year."
              />
              <div className="flex flex-wrap gap-3">
                <RsvpButton />
                {event.links.callForSpeakers ? (
                  <ButtonLink href={event.links.callForSpeakers} external variant="secondary">
                    Speak at DevFest
                  </ButtonLink>
                ) : null}
              </div>
            </div>

            <div className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl font-extrabold text-navy">On stage in {event.lastEdition.year}</h3>
                <Link href="/speakers" className="font-semibold text-primary underline underline-offset-4">
                  See the full {event.lastEdition.year} lineup
                </Link>
              </div>
              <ul
                tabIndex={0}
                aria-label={`${event.lastEdition.year} speakers, scroll sideways to see more`}
                className="-mx-4 mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              >
                {speakers2025.map((s) => (
                  <li key={s.name} className="w-52 shrink-0 snap-start">
                    <PastSpeakerCard speaker={s} compact />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </Container>
    </section>
  );
}

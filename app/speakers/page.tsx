import { PastSpeakerCard, SpeakerCard } from "@/components/speakers/cards";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { JsonLd } from "@/components/seo/json-ld";
import { event } from "@/content/event";
import { speakers2025 } from "@/content/past-editions";
import { schedule } from "@/content/schedule";
import { speakers } from "@/content/speakers";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const published = event.sections.speakers === "published" && speakers.length > 0;

export const metadata = pageMetadata({
  title: "Speakers",
  description: published
    ? `Meet the speakers at ${event.fullName}.`
    : `The ${event.fullName} lineup is coming soon. See who took the stage in ${event.lastEdition.year}.`,
  path: "/speakers",
  // Thin until the 2026 lineup exists; the sitemap entry follows the same flag.
  noindex: !published,
});

export default function SpeakersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Speakers", path: "/speakers" }])} />
      <PageHeader
        title={published ? "Speakers" : "Speakers coming soon"}
        description={
          published
            ? `The people taking the stage at ${event.fullName}.`
            : "We're finalising the 2026 lineup. RSVP to be first to hear."
        }
        glyph="brace-left"
      />
      <Container className="py-16 sm:py-20">
        {published ? (
          <ul className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {speakers.map((s) => (
              <li key={s.id}>
                <SpeakerCard
                  speaker={s}
                  sessions={schedule.filter((session) => s.sessionIds?.includes(session.id))}
                />
              </li>
            ))}
          </ul>
        ) : (
          <>
            <div className="mb-14">
              <RsvpButton size="lg" />
            </div>
            <h2 className="font-display text-3xl font-extrabold text-navy">On stage in {event.lastEdition.year}</h2>
            <ul className="mt-8 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
              {speakers2025.map((s) => (
                <li key={s.name}>
                  <PastSpeakerCard speaker={s} />
                </li>
              ))}
            </ul>
          </>
        )}
      </Container>
    </>
  );
}

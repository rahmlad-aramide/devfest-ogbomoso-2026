import { Timeline } from "@/components/schedule/timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { event } from "@/content/event";
import { schedule } from "@/content/schedule";
import { formatEventDate, formatEventTimeRange } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const published = event.sections.schedule === "published" && schedule.length > 0;

export const metadata = pageMetadata({
  title: "Schedule",
  description: published
    ? `The full ${event.fullName} agenda for ${formatEventDate()}.`
    : `The ${event.fullName} agenda is coming soon. ${formatEventDate()}, ${formatEventTimeRange()}.`,
  path: "/schedule",
  noindex: !published,
});

export default function SchedulePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Schedule", path: "/schedule" }])} />
      <PageHeader
        title={published ? "Schedule" : "Schedule coming soon"}
        description={`${formatEventDate()}, ${formatEventTimeRange()}`}
        glyph="double-slash"
        glyphColor="text-google-red"
      />
      <Container className="py-16 sm:py-20">
        {published ? (
          <Timeline sessions={schedule} />
        ) : (
          <div className="max-w-xl">
            <p className="text-lg leading-relaxed text-muted">
              We&apos;re building a full day of talks and hands-on workshops across AI, cloud, mobile and web. The
              agenda will appear here as soon as it&apos;s confirmed.
            </p>
            <RsvpButton size="lg" className="mt-8" />
          </div>
        )}
      </Container>
    </>
  );
}

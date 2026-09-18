import Link from "next/link";
import { Timeline } from "@/components/schedule/timeline";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/content/event";
import { schedule } from "@/content/schedule";
import { formatEventDate, formatSessionTime } from "@/lib/format";

const PREVIEW_COUNT = 4;

export function Schedule() {
  const published = event.sections.schedule === "published" && schedule.length > 0;

  return (
    <section id="schedule" aria-labelledby="schedule-title" className="py-20 sm:py-28">
      <Container>
        {published ? (
          <>
            <SectionHeading id="schedule-title" title="The day, hour by hour" description={formatEventDate()} />
            <div className="mt-12">
              <Timeline sessions={schedule.slice(0, PREVIEW_COUNT)} />
            </div>
            {schedule.length > PREVIEW_COUNT ? (
              <Link href="/schedule" className="mt-8 inline-block font-semibold text-primary underline underline-offset-4">
                See the full schedule
              </Link>
            ) : null}
          </>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeading
              id="schedule-title"
              title="One day of talks and hands-on workshops"
              description="The full agenda is coming soon. Expect sessions across AI, cloud, mobile and web, with time to meet people in between."
            />
            <p className="font-display text-4xl leading-tight font-extrabold tracking-tight text-primary sm:text-5xl">
              <span className="whitespace-nowrap">{formatSessionTime("09:00")}</span>
              <span className="text-navy"> to </span>
              <span className="whitespace-nowrap">{formatSessionTime("16:00")}</span>
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

import { Container } from "@/components/ui/container";
import { Glyph } from "@/components/ui/glyph";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/content/event";

const bulletColors = ["text-google-blue", "text-google-red", "text-google-green"];

export function About() {
  const { lastEdition, rsvps } = event;

  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <SectionHeading id="about-title" title="Built for everyone who builds" />
          <div className="mt-6 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
            {event.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Key themes">
            {[...event.themes, ...event.formats].map((theme) => (
              <li
                key={theme}
                className="rounded-full border border-line bg-surface px-4 py-1.5 text-sm font-semibold text-navy"
              >
                {theme}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl font-extrabold text-navy">What to expect</h3>
          <ul className="mt-5 space-y-5">
            {event.expect.map((item, i) => (
              <li key={item} className="flex gap-4">
                <Glyph
                  name="chevron-right"
                  className={`mt-0.5 size-6 shrink-0 ${bulletColors[i % bulletColors.length]}`}
                />
                <span className="text-lg leading-snug text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-display text-6xl font-extrabold tracking-tight text-primary">
              {lastEdition.attendees}
            </p>
            <p className="mt-2 max-w-xs text-muted">
              people joined us last year, {lastEdition.note}. This year, we&apos;re going bigger.
            </p>
            {rsvps ? (
              <p className="mt-4 font-semibold text-navy">
                {rsvps.count} people have already RSVP&apos;d.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

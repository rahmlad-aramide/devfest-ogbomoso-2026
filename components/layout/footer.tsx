import { CalendarDays, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { GlyphStrip } from "@/components/ui/glyph";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { SocialIcon } from "@/components/ui/social-icon";
import { event } from "@/content/event";
import { nav, secondaryNav, site, socials } from "@/content/site";
import { cityLabel, formatEventDate, formatEventTimeRange, venueLabel } from "@/lib/format";
import { Wordmark } from "./wordmark";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      <Container className="pt-14">
        <GlyphStrip />

        <div className="mt-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark className="text-white" />
            <p className="mt-4 max-w-sm text-white/70">
              A community-led developer conference by {event.organizer}. Talks, workshops and the people
              building tech in Ogbomoso.
            </p>
            <RsvpButton variant="inverse" size="lg" className="mt-6" />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">When and where</h2>
            <ul className="mt-4 space-y-3 text-white/75">
              <li className="flex gap-3">
                <CalendarDays className="mt-0.5 size-5 shrink-0 text-google-yellow" aria-hidden="true" />
                {formatEventDate()}
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-google-yellow" aria-hidden="true" />
                {formatEventTimeRange()}
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-google-yellow" aria-hidden="true" />
                <span>
                  {venueLabel()}
                  <br />
                  {cityLabel()}
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold">Explore</h2>
            <ul className="mt-4 space-y-3">
              {[...nav, ...secondaryNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/75 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {socials.length > 0 ? (
              <ul className="mt-6 flex gap-3">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border border-white/25 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <SocialIcon platform={s.platform} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-white/15 py-6 text-sm text-white/60 sm:flex-row sm:justify-between">
          <p>
            © {event.year} {site.organization}. DevFest is a community-led event.
          </p>
          <p>Ogbomoso, Oyo State, Nigeria</p>
        </div>
      </Container>
    </footer>
  );
}

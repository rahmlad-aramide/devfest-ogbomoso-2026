import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { UnlessEnded } from "@/components/ui/event-phase";
import { RsvpButton } from "@/components/ui/rsvp-button";
import { event } from "@/content/event";
import { formatDayHours, formatDayParts } from "@/lib/format";
import { HeroArt } from "./hero-art";
import { HeroVideo } from "./hero-video";
import { HeroActions, HeroCountdown } from "./hero-status";

type HeroProps = {
  videoBackground?: boolean;
};

export function Hero({ videoBackground = false }: HeroProps) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy text-white"
    >
      {/* The still photo is always rendered: it is the LCP image and the fallback when the video is skipped. */}
      <Image
        src={event.heroImage}
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {videoBackground ? <HeroVideo /> : null}
      {/* Translucent navy so the photo shows through; heavier behind the text. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70"
      />
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="size-2 rounded-full bg-google-yellow" aria-hidden="true" />
            Two days · {formatDayParts(1).month} {formatDayParts(1).date}–{formatDayParts(2).date}, {event.year}
          </p>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.25rem,9.5vw,7.25rem)] leading-[0.88] font-extrabold tracking-tighter"
          >
            <span className="block">DevFest</span>
            <span className="block text-google-yellow">Ogbomoso</span>
            <span className="block">{event.year}</span>
          </h1>

          <p className="mt-6 max-w-md text-xl leading-snug text-white/85 sm:text-2xl">
            {event.headline}
          </p>

          <ol className="mt-6 grid max-w-xl gap-3 sm:grid-cols-2">
            {event.days.map((d) => {
              const parts = formatDayParts(d.day);
              return (
                <li
                  key={d.day}
                  className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur"
                >
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 text-center leading-none">
                      <div className="font-display text-5xl font-extrabold text-google-yellow">{parts.date}</div>
                      <div className="mt-1 text-xs font-semibold tracking-wider text-white/75 uppercase">
                        {parts.weekday} · {parts.month}
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold tracking-wider text-white/60 uppercase">Day {d.day}</p>
                      <p className="font-display text-lg leading-tight font-bold">{d.label}</p>
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <Clock className="size-4 shrink-0 text-google-yellow" aria-hidden="true" />
                      {formatDayHours(d.day)}
                    </li>
                    <li className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-4 shrink-0 text-google-yellow" aria-hidden="true" />
                      {d.venue.name}
                    </li>
                  </ul>
                  <UnlessEnded>
                    <RsvpButton href={d.rsvpUrl} variant="accent" className="mt-4 w-full">
                      RSVP<span className="sr-only"> for Day {d.day}</span>
                    </RsvpButton>
                  </UnlessEnded>
                </li>
              );
            })}
          </ol>

          <HeroActions />
        </div>

        <div className="flex flex-col-reverse gap-10 lg:flex-col">
          <HeroArt />
          <HeroCountdown />
        </div>
      </Container>
    </section>
  );
}

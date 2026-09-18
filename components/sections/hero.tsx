import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { event } from "@/content/event";
import { cityLabel, formatEventDate, formatEventTimeRange, venueLabel } from "@/lib/format";
import { HeroArt } from "./hero-art";
import { HeroActions, HeroCountdown } from "./hero-status";

export function Hero() {
  const facts = [
    { Icon: CalendarDays, text: formatEventDate() },
    { Icon: Clock, text: formatEventTimeRange() },
    { Icon: MapPin, text: `${venueLabel()}, ${cityLabel()}` },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy text-white">
      <Image
        src={event.heroImage}
        alt=""
        fill
        priority
        quality={70}
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Translucent navy so the photo shows through; heavier behind the text. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      <Container className="grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:py-16">
        <div>
          <h1
            id="hero-title"
            className="font-display text-[clamp(3.25rem,9.5vw,7.25rem)] leading-[0.88] font-extrabold tracking-tighter"
          >
            <span className="block">DevFest</span>
            <span className="block text-google-yellow">Ogbomoso</span>
            <span className="block">{event.year}</span>
          </h1>

          <p className="mt-6 max-w-md text-xl leading-snug text-white/85 sm:text-2xl">{event.headline}</p>

          <ul className="mt-5 space-y-2 text-white/80">
            {facts.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <Icon className="size-5 shrink-0 text-google-yellow" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>

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

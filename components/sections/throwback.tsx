import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryEditions } from "@/content/gallery";
import { throwback } from "@/content/past-editions";
import type { Photo } from "@/content/past-editions";
import { cn } from "@/lib/cn";
import { CountUp } from "./count-up";

const PHOTOS_PER_YEAR = 6;
const ACCENTS = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

type Item =
  | { kind: "year"; year: number; accent: string }
  | { kind: "photo"; year: number; photo: Photo };

/** Evenly spaced picks so each edition is represented across its whole album. */
function pick(photos: Photo[], count: number) {
  if (photos.length <= count) return photos;
  return Array.from({ length: count }, (_, i) => photos[Math.floor((i * photos.length) / count)]);
}

function buildLane(years: number[]): Item[] {
  return galleryEditions
    .filter((edition) => years.includes(edition.year))
    .flatMap((edition, i): Item[] => [
      { kind: "year", year: edition.year, accent: ACCENTS[(edition.year + i) % ACCENTS.length] },
      ...pick(edition.photos, PHOTOS_PER_YEAR).map((photo) => ({ kind: "photo" as const, year: edition.year, photo })),
    ]);
}

function Card({ item, index, clone }: { item: Item; index: number; clone: boolean }) {
  if (item.kind === "year") {
    return (
      <li aria-hidden="true" className="flex h-56 shrink-0 items-center px-4 sm:h-72 sm:px-8">
        <span
          className="font-display text-7xl font-extrabold tracking-tighter text-transparent sm:text-9xl"
          style={{ WebkitTextStroke: `2px ${item.accent}` }}
        >
          {item.year}
        </span>
      </li>
    );
  }

  const { photo } = item;
  return (
    <li
      className={cn(
        "group h-56 w-72 shrink-0 scroll-ms-4 snap-start transition-transform duration-300 ease-out sm:h-72 sm:w-96",
        "hover:z-10 hover:scale-105 hover:rotate-0",
        index % 2 ? "rotate-2" : "-rotate-2",
      )}
    >
      <figure className="relative size-full overflow-hidden rounded-2xl bg-navy-deep ring-1 ring-white/10">
        <Image
          src={photo.src}
          alt={clone ? "" : photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 640px) 384px, 288px"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <span className="absolute top-3 left-3 rounded-full bg-navy-deep/80 px-3 py-1 text-xs font-bold text-white backdrop-blur">
          {item.year}
        </span>
        <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-navy-deep/95 to-transparent p-4 pt-12 text-sm opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          {photo.caption}
        </figcaption>
      </figure>
    </li>
  );
}

function Lane({ items, direction, label, duration }: { items: Item[]; direction: "left" | "right"; label: string; duration: number }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="marquee overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div
        className="marquee-track flex w-max"
        data-direction={direction}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {[false, true].map((clone) => (
          <ul
            key={String(clone)}
            aria-hidden={clone || undefined}
            className={cn("flex shrink-0 items-center gap-4 pr-4", clone && "marquee-clone")}
          >
            {items.map((item, i) => (
              <Card key={i} item={item} index={i} clone={clone} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Throwback() {
  if (!throwback.show) return null;

  const years = galleryEditions.map((edition) => edition.year);
  const half = Math.ceil(years.length / 2);

  return (
    <section id="throwback" aria-labelledby="throwback-title" className="overflow-hidden bg-navy py-20 text-white sm:py-28">
      <Container>
        <SectionHeading id="throwback-title" title={throwback.title} description={throwback.subtitle} tone="dark" />
      </Container>

      <div className="mt-10">
        <Lane items={buildLane(years.slice(0, half))} direction="left" duration={110} label="Photos from DevFest Ogbomoso, earlier years" />
        <Lane items={buildLane(years.slice(half))} direction="right" duration={110} label="Photos from DevFest Ogbomoso, recent years" />
      </div>

      <Container>
        {throwback.stats.length > 0 ? (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/15 py-8 md:grid-cols-4">
            {throwback.stats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-4xl font-extrabold text-google-yellow sm:text-5xl">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-1 text-sm text-white/75">{stat.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <ButtonLink href="/memories" variant="accent" size="lg">
            Explore all memories
          </ButtonLink>
          {throwback.albumUrl ? (
            <ButtonLink href={throwback.albumUrl} external variant="outline-inverse" size="lg">
              See the full album
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

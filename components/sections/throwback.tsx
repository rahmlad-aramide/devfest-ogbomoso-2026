import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { throwback } from "@/content/past-editions";
import { cn } from "@/lib/cn";

export function Throwback() {
  if (!throwback.show) return null;

  return (
    <section id="throwback" aria-labelledby="throwback-title" className="bg-navy py-20 text-white sm:py-28">
      <Container>
        <SectionHeading id="throwback-title" title={throwback.title} description={throwback.subtitle} tone="dark" />

        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
          {throwback.photos.map((photo, i) => {
            const feature = i === 0;
            return (
              <li key={photo.src} className={cn(feature && "col-span-2 row-span-2")}>
                <figure className="relative h-full min-h-40 overflow-hidden rounded-2xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1600}
                    height={1067}
                    sizes={feature ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                    className="aspect-[4/3] size-full object-cover"
                  />
                  <figcaption
                    className={cn(
                      "absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/90 to-transparent p-4 text-sm",
                      feature ? "pt-16 text-base" : "sr-only",
                    )}
                  >
                    {photo.caption}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>

        {throwback.albumUrl ? (
          <p className="mt-8">
            <a
              href={throwback.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-google-yellow underline underline-offset-4 hover:text-white"
            >
              See the full album
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </Container>
    </section>
  );
}

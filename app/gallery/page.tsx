import Link from "next/link";
import { Gallery } from "@/components/memories/gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { galleryEditions } from "@/content/gallery";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Gallery",
  description: "The people, talks and moments from DevFest Ogbomoso, in photos.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />
      <PageHeader
        title="Gallery"
        description="Community moments, through the years."
        compact
        glyph="semicolon"
        glyphColor="text-google-green"
      />
      <Container className="py-8 sm:py-10">
        <div className="space-y-12 sm:space-y-16">
          {galleryEditions.map(({ year, photos }) => (
            <section key={year} aria-labelledby={`gallery-${year}`}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-3">
                <h2 id={`gallery-${year}`} className="font-display text-xl font-bold text-navy">
                  {year}
                </h2>
                <p className="text-sm text-muted">{photos.length} photos</p>
              </div>
              <Gallery photos={photos} layout="masonry" initialCount={15} label={`DevFest ${year}`} />
            </section>
          ))}
        </div>
        <p className="mt-10">
          <Link href="/memories" className="font-semibold text-link underline underline-offset-4 hover:text-primary">
            More highlights from past editions
          </Link>
        </p>
      </Container>
    </>
  );
}

import { Gallery } from "@/components/memories/gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { recapVideo, throwback } from "@/content/past-editions";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Memories",
  description: "Photos and highlights from previous DevFest Ogbomoso editions.",
  path: "/memories",
});

export default function MemoriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Memories", path: "/memories" }])} />
      <PageHeader
        title="Memories"
        description="A look back at how the community showed up in previous editions."
        glyph="semicolon"
        glyphColor="text-google-green"
      />
      <Container className="py-16 sm:py-20">
        <h2 className="font-display text-3xl font-extrabold text-navy">DevFest &apos;{String(throwback.year).slice(2)}</h2>
        <div className="mt-8">
          <Gallery photos={throwback.photos} />
        </div>

        <h2 className="mt-20 font-display text-3xl font-extrabold text-navy">DevFest &apos;{String(recapVideo.year).slice(2)} recap</h2>
        <video
          controls
          preload="none"
          playsInline
          poster={recapVideo.poster}
          className="mt-8 aspect-video w-full max-w-3xl rounded-2xl bg-navy-deep"
        >
          <source src={recapVideo.src} type="video/mp4" />
          Your browser can&apos;t play this video.
        </video>
        <p className="mt-3 text-sm text-muted">A short, silent highlight reel from the {recapVideo.year} edition.</p>

        {throwback.albumUrl ? (
          <p className="mt-10">
            <a
              href={throwback.albumUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-4"
            >
              See the full album
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        ) : null}
      </Container>
    </>
  );
}

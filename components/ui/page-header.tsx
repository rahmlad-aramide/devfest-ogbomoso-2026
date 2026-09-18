import { Container } from "@/components/ui/container";
import { Glyph, type GlyphName } from "@/components/ui/glyph";

/** Title band for inner pages: navy, left-aligned, one large decorative glyph. */
export function PageHeader({
  title,
  description,
  glyph = "chevron-right",
  glyphColor = "text-google-yellow",
}: {
  title: string;
  description?: string;
  glyph?: GlyphName;
  glyphColor?: string;
}) {
  return (
    <div className="overflow-hidden bg-navy text-white">
      <Container className="relative py-14 sm:py-20">
        <h1 className="max-w-3xl font-display text-5xl font-extrabold tracking-tighter text-balance sm:text-7xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{description}</p>
        ) : null}
        <Glyph
          name={glyph}
          className={`pointer-events-none absolute top-1/2 right-4 hidden size-56 -translate-y-1/2 rotate-6 lg:block ${glyphColor}`}
        />
      </Container>
    </div>
  );
}

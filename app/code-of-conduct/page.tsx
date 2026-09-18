import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { codeOfConduct } from "@/content/code-of-conduct";
import { site, socials } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Code of conduct",
  description: "How we keep DevFest Ogbomoso welcoming and safe for everyone.",
  path: "/code-of-conduct",
});

export default function CodeOfConductPage() {
  const x = socials.find((s) => s.platform === "x");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Code of conduct", path: "/code-of-conduct" }])} />
      <PageHeader title="Code of conduct" description={codeOfConduct.intro} glyph="equals" glyphColor="text-google-blue" />
      <Container className="max-w-3xl py-16 sm:py-20">
        {codeOfConduct.sections.map((section) => (
          <section key={section.title} className="mb-12 last:mb-0">
            <h2 className="font-display text-3xl font-extrabold text-navy">{section.title}</h2>
            <ul className="mt-5 space-y-4 text-lg leading-relaxed text-ink/90">
              {section.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="mt-3 size-2 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
        {x ? (
          <p className="mt-12 border-t border-line pt-6 text-muted">
            Questions about this policy? Reach {site.organization} on{" "}
            <a href={x.href} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline underline-offset-4">
              X ({site.twitterHandle})<span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </p>
        ) : null}
      </Container>
    </>
  );
}

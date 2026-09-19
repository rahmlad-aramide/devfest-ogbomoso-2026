import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/content/faqs";
import { site, socials } from "@/content/site";

export function Faq() {
  const x = socials.find((s) => s.platform === "x");

  return (
    <section id="faqs" aria-labelledby="faq-title" className="bg-surface py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <div>
          <SectionHeading
            id="faq-title"
            title="Questions, answered"
            description="Can't find what you're looking for?"
          />
          {x ? (
            <p className="mt-2 text-lg text-muted">
              Ask us on{" "}
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-link underline underline-offset-4"
              >
                X ({site.twitterHandle})
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          ) : null}
        </div>

        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-xl font-bold text-navy marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-5 shrink-0 text-primary transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-prose pb-6 leading-relaxed text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

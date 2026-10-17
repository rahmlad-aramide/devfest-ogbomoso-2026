import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { FeedbackQr } from "@/components/ui/feedback-qr";
import { PageHeader } from "@/components/ui/page-header";
import { event } from "@/content/event";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Share your feedback",
  description: `Tell us what you thought of ${event.fullName}. Your feedback shapes the next edition.`,
  path: "/feedback",
});

export default function FeedbackPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Feedback", path: "/feedback" }])} />
      <PageHeader
        title="Share your feedback"
        description={`Tell us what you thought of ${event.fullName}. It takes less than a minute and shapes the next edition.`}
        glyph="equals"
        glyphColor="text-google-green"
      />
      <Container className="max-w-3xl py-10 sm:py-14">
        <div className="mb-10 flex justify-center">
          <FeedbackQr size={320} />
        </div>
        <iframe
          src={event.feedback.embedUrl}
          title={`${event.fullName} feedback form`}
          loading="lazy"
          className="h-[1500px] w-full rounded-2xl border border-line bg-white sm:h-[1300px]"
        >
          Loading…
        </iframe>
        <p className="mt-6 text-center text-muted">
          Form not loading?{" "}
          <a
            href={event.feedback.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-link underline underline-offset-4"
          >
            Open it in a new tab<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </Container>
    </>
  );
}

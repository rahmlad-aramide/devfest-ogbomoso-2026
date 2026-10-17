import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FeedbackQr } from "@/components/ui/feedback-qr";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/content/event";

export function FeedbackPromo() {
  return (
    <section id="feedback" aria-labelledby="feedback-title" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <SectionHeading
          id="feedback-title"
          title="Tell us how we did"
          description={`Been to ${event.fullName}? Share your feedback within a minute and help us make the next one better.`}
        />
        <div className="flex flex-col items-start gap-6 md:items-center">
          <FeedbackQr size={176} />
          <ButtonLink href="/feedback" size="lg">
            Share your feedback
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

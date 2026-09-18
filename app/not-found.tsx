import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glyph } from "@/components/ui/glyph";
import { RsvpButton } from "@/components/ui/rsvp-button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Container className="grid items-center gap-10 py-20 sm:py-28 md:grid-cols-[1fr_auto]">
      <div>
        <h1 className="font-display text-5xl font-extrabold tracking-tighter text-navy text-balance sm:text-7xl">
          That page doesn&apos;t exist
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          The link may be old or mistyped. Head back to the home page to find speakers, the schedule and how to RSVP.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/" size="lg">
            Back to home
          </ButtonLink>
          <RsvpButton variant="secondary" size="lg" />
        </div>
      </div>
      <div aria-hidden="true" className="flex items-center gap-1">
        <Glyph name="brace-left" className="size-24 text-google-yellow sm:size-32" />
        <Glyph name="slash" className="size-24 text-google-red sm:size-32" />
        <Glyph name="brace-right" className="size-24 text-google-yellow sm:size-32" />
      </div>
    </Container>
  );
}

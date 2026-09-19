import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glyph } from "@/components/ui/glyph";
import { SectionHeading } from "@/components/ui/section-heading";
import { event } from "@/content/event";

const steps = ["Add your photo", "Type your name", "Download and share"];

/** A CSS mock of the DP (no real person's photo), so the section previews the design without any image. */
function DpMock() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-sm -rotate-3 overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-[#153b93] shadow-float"
    >
      <Glyph name="brace-left" className="absolute top-[4%] left-[4%] size-[14%] text-google-yellow" />
      <Glyph name="chevron-left" className="absolute top-[3%] right-[8%] size-[11%] text-google-blue" />
      <Glyph name="slash" className="absolute top-[31%] left-[3%] size-[10%] text-google-red" />
      <Glyph name="chevron-right" className="absolute top-[52%] right-[6%] size-[10%] text-google-green" />
      <Glyph name="semicolon" className="absolute top-[55%] left-[6%] size-[9%] text-google-green" />
      <div className="absolute top-[14%] left-1/2 grid aspect-square w-[56%] -translate-x-1/2 place-items-center rounded-full bg-white/10 ring-[6px] ring-google-yellow">
        <Glyph name="plus" className="size-1/4 text-white/60" />
      </div>
      <div className="absolute inset-x-0 bottom-[5%] px-4 text-center text-white">
        <p className="text-[0.8rem] text-white/80">I&apos;m attending</p>
        <p className="font-display text-xl leading-tight font-extrabold sm:text-2xl">{event.fullName}</p>
        <p className="font-display text-lg font-extrabold text-google-yellow">Your name</p>
      </div>
    </div>
  );
}

export function DpPromo() {
  return (
    <section id="dp" aria-labelledby="dp-title" className="bg-primary-soft py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            id="dp-title"
            title="Show you're coming"
            description={`Make your ${event.fullName} DP in seconds, then share it so your friends know you'll be there.`}
          />
          <ol className="mt-8 space-y-3">
            {steps.map((step, i) => (
              <li key={step} className="flex items-center gap-4 text-lg text-ink">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary font-display font-bold text-white">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href="/dp" size="lg">
              Create your DP
            </ButtonLink>
            <p className="text-sm text-muted">Your photo stays on your device.</p>
          </div>
        </div>
        <DpMock />
      </Container>
    </section>
  );
}

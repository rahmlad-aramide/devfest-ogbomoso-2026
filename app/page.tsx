import { About } from "@/components/sections/about";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Schedule } from "@/components/sections/schedule";
import { Speakers } from "@/components/sections/speakers";
import { Team } from "@/components/sections/team";
import { Throwback } from "@/components/sections/throwback";
import { JsonLd } from "@/components/seo/json-ld";
import { eventJsonLd, faqJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <JsonLd data={eventJsonLd()} />
      <JsonLd data={faqJsonLd()} />
      <Hero />
      <About />
      <Speakers />
      <Schedule />
      <Throwback />
      <Team />
      <Faq />
      <ClosingCta />
    </>
  );
}

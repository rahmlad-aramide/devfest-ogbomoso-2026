import { DpGenerator } from "@/components/dp/dp-generator";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageHeader } from "@/components/ui/page-header";
import { event } from "@/content/event";
import { pageMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Create your DP",
  description: `Make your ${event.fullName} display picture in seconds and share that you're coming.`,
  path: "/dp",
});

export default function DpPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Create your DP", path: "/dp" }])} />
      <PageHeader
        title="Show you're coming"
        description={`Add your photo and name, then download your ${event.fullName} DP to share.`}
        glyph="plus"
        glyphColor="text-google-blue"
      />
      <Container className="py-14 sm:py-20">
        <DpGenerator />
      </Container>
    </>
  );
}

import { event } from "@/content/event";
import { faqs } from "@/content/faqs";
import { site, socials } from "@/content/site";
import { isVenueAnnounced } from "@/lib/format";
import { absoluteUrl } from "@/lib/seo";

const context = "https://schema.org";

export function organizationJsonLd() {
  return {
    "@context": context,
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.organization,
    alternateName: site.organizationLongName,
    url: site.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    sameAs: socials.map((s) => s.href),
    ...(site.contactEmail ? { email: site.contactEmail } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": context,
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    name: event.fullName,
    url: site.url,
    inLanguage: site.language,
    publisher: { "@id": `${site.url}/#organization` },
  };
}

/**
 * schema.org/Event for the home page. Rich results need a Place with an address, so the
 * place is always present; its `name` is only set once the venue is announced.
 * No `offers` block: ticketing is external (Bevy) and pricing is not published here.
 */
export function eventJsonLd() {
  return {
    "@context": context,
    "@type": "Event",
    "@id": `${site.url}/#event`,
    name: event.fullName,
    description: event.summary,
    url: site.url,
    startDate: event.start,
    endDate: event.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: site.language,
    image: [absoluteUrl("/opengraph-image")],
    location: {
      "@type": "Place",
      ...(isVenueAnnounced() ? { name: event.venue.name } : {}),
      address: {
        "@type": "PostalAddress",
        ...(event.venue.address ? { streetAddress: event.venue.address } : {}),
        addressLocality: event.venue.city,
        addressRegion: event.venue.state,
        postalCode: event.venue.postalCode,
        addressCountry: event.venue.country,
      },
    },
    organizer: { "@id": `${site.url}/#organization` },
    keywords: [...event.themes, ...event.formats].join(", "),
  };
}

export function faqJsonLd() {
  return {
    "@context": context,
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

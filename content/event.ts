import type { SectionStatus } from "./types";

/**
 * Single source of truth for DevFest Ogbomoso 2026.
 * Edit this file when details change. Components never hold dates, links or copy.
 *
 * Source: GDG Bevy event page (checked 2026-09-18).
 */
export const event = {
  name: "DevFest Ogbomoso",
  year: 2026,
  fullName: "DevFest Ogbomoso 2026",
  organizer: "GDG Ogbomoso",

  headline: "Ogbomoso's biggest tech gathering returns.",
  /** Date-free one-liner. `metaDescription` in lib/seo.ts appends the formatted date. */
  summary:
    "DevFest Ogbomoso 2026: talks and hands-on workshops on AI, cloud, mobile and web for developers and builders.",
  about: [
    "This year, DevFest Ogbomoso brings together professional developers, non-traditional developers, and tech-savvy builders who create with dev tools without calling themselves developers (\"Builders\").",
    "Whether you're writing production code, building with AI or no-code tools, launching a startup, or a student simply exploring a tech career, DevFest Ogbomoso is where you'll learn, find the right connections, and get the inspiration that takes you to the next level.",
  ],
  expect: [
    "Talks and hands-on workshops covering the latest in cloud, AI, mobile, and web",
    "Real conversations with the people building Nigeria's tech ecosystem",
    "A community that keeps showing up long after the closing keynote",
  ],
  audience: ["Professional developers", "Non-traditional developers", "Builders", "Students"],

  /**
   * Fixed instants with explicit offsets. Nigeria is GMT+1 year-round (no DST),
   * so the offset is safe to hard-code. All countdown and status logic derives from these.
   */
  start: "2026-10-17T09:00:00+01:00",
  end: "2026-10-17T16:00:00+01:00",
  timezone: "Africa/Lagos",

  venue: {
    /** Set to the real venue name once announced. "TBA" switches the UI to its announcement-pending state. */
    name: "TBA",
    address: null as string | null,
    city: "Ogbomoso",
    state: "Oyo State",
    country: "NG",
    postalCode: "212102",
    /** Google Maps link, once the venue is known. */
    mapUrl: null as string | null,
  },

  /**
   * Hero background photo (decorative, sits under a translucent navy overlay).
   * TODO(2026): swap for a DevFest 2025 photo when available. Any wide image works.
   */
  heroImage: "/images/crowd-bw.webp",

  /** Registration happens on the GDG Bevy platform. Every RSVP button uses this. */
  rsvpUrl: "https://gdg.community.dev/events/details/google-gdg-ogbomoso-presents-devfest-ogbomoso-2026/",
  rsvpLabel: "RSVP now",

  /** Key themes as listed on Bevy. */
  themes: ["AI", "Gemini", "Gemini Enterprise Agent Platform"],
  formats: ["Conference", "Workshop / hands-on sessions"],
  /** TODO(2026): official theme tagline, if GDG issues one. Leave null to hide it. */
  themeTagline: null as string | null,

  /**
   * Manually maintained: update by hand from the Bevy page, it is NOT live.
   * Set to null to hide.
   */
  rsvps: { count: 359, asOf: "2026-09-18" } as { count: number; asOf: string } | null,

  /** Last year's edition, in the past tense so it can never go stale. */
  lastEdition: { year: 2025, attendees: "500+", note: "over two days" },

  /** Optional calls to action. `null` hides the button/section that uses them. */
  links: {
    /** TODO(2026): call-for-speakers form. */
    callForSpeakers: null as string | null,
    /** TODO(2026): volunteer form. */
    volunteer: null as string | null,
    /** TODO(2026): sponsorship deck or contact. */
    sponsor: null as string | null,
    /** TODO(2026): code of conduct if hosted elsewhere (otherwise we serve /code-of-conduct). */
    codeOfConduct: null as string | null,
  },

  /** Flip a section to "published" once its content is ready. Drives the coming-soon states. */
  sections: {
    speakers: "coming-soon",
    schedule: "coming-soon",
  } as Record<"speakers" | "schedule", SectionStatus>,
} as const;

export type EventConfig = typeof event;

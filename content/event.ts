import type { SectionStatus } from "./types";

/**
 * Per-day dates and venues. DevFest Ogbomoso 2026 runs over two days at two different venues:
 * day 1 is the workshop/codelab track, day 2 is the main conference. `event.start`/`event.end`
 * below (and every date/time/venue helper in lib/format.ts) describe day 2 only — it's the day
 * RSVPs, the homepage countdown and structured data count down to. Day 1's date and venue live
 * here and surface on /schedule.
 */
const days = [
  {
    day: 1,
    label: "Workshops & Codelabs",
    start: "2026-10-16T09:00:00+01:00",
    end: "2026-10-16T15:50:00+01:00",
    venue: {
      name: "SQI College of ICT",
      address: "Opposite Yoaco Filling Station, Yoaco, Ogbomoso",
    },
  },
  {
    day: 2,
    label: "Main Conference",
    start: "2026-10-17T08:00:00+01:00",
    end: "2026-10-17T17:15:00+01:00",
    venue: {
      name: "The Assembly",
      address: "Beside LAUTECH, Ogbomoso - Ilorin Rd., Oyo State, Nigeria",
    },
  },
] as const;

/**
 * Single source of truth for DevFest Ogbomoso 2026.
 * Edit this file when details change. Components never hold dates, links or copy.
 *
 * Source: GDG Bevy event page (checked 2026-09-18); day dates/venues from the 2026 speaker
 * announcement graphics (checked 2026-10-07).
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
   * so the offset is safe to hard-code. All countdown and status logic derives from these —
   * and from here on they track day 2 (Main Conference), see `days` above.
   */
  start: days[1].start,
  end: days[1].end,
  timezone: "Africa/Lagos",

  /** Day 1 and day 2 dates/venues. Mirrors `start`/`end`/`venue` below for day 2. */
  days,

  venue: {
    name: days[1].venue.name,
    address: days[1].venue.address as string | null,
    city: "Ogbomoso",
    state: "Oyo State",
    country: "NG",
    postalCode: "212102",
    /** Google Maps link, once published. */
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
    speakers: "published",
    schedule: "published",
  } as Record<"speakers" | "schedule", SectionStatus>,
} as const;

export type EventConfig = typeof event;

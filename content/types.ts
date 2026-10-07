/** Shared shapes for everything under `content/`. */

export type SectionStatus = "coming-soon" | "published";

export type SocialPlatform = "x" | "linkedin" | "instagram" | "youtube" | "github" | "website";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  company?: string;
  /** Path under /public, e.g. "/images/speakers-2026/jane-doe.webp" */
  photo?: string;
  bio?: string;
  /** Ids of the sessions this person presents (see schedule.ts). */
  sessionIds?: string[];
  socials?: SocialLink[];
}

export type SessionKind = "keynote" | "talk" | "workshop" | "panel" | "break" | "social" | "sponsor" | "tbd";

export interface Session {
  id: string;
  /** DevFest Ogbomoso 2026 runs over two days: 1 = Workshops & Codelabs, 2 = Main Conference. */
  day: 1 | 2;
  /** Local 24h time in the event timezone, e.g. "09:30". */
  start: string;
  end: string;
  title: string;
  kind: SessionKind;
  description?: string;
  /** Content theme, e.g. "AI", "Engineering and Security", "Cloud" (day 1 breakout sessions). */
  track?: string;
  /** Ids of speakers from content/speakers.ts, once their full profile exists. */
  speakerIds?: string[];
  /** Plain-text presenter name(s), used until a full Speaker profile exists. */
  speakerNames?: string[];
  /** Breakout block label, e.g. "Track 1" (day 1 only — sessions sharing a block run in parallel). */
  room?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Path under /public. Omit to render an initials avatar. */
  photo?: string;
  /** Every team this person belongs to. */
  teams: TeamName[];
  /** Teams this person leads. */
  leadOf?: TeamName[];
  socials?: SocialLink[];
}

export type TeamName = "Organizers" | "Media and Publicity" | "Design" | "Dev" | "Programs" | "Content";

export interface Faq {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

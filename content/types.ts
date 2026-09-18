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

export type SessionKind = "keynote" | "talk" | "workshop" | "panel" | "break" | "social";

export interface Session {
  id: string;
  /** Local 24h time in the event timezone, e.g. "09:30". DevFest 2026 is a single day. */
  start: string;
  end: string;
  title: string;
  kind: SessionKind;
  description?: string;
  track?: string;
  speakerIds?: string[];
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

export type TeamName = "Organizers" | "Media and Publicity" | "Design" | "Dev";

export interface Faq {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

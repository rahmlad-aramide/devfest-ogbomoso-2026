import type { NavItem, SocialLink } from "./types";

/**
 * Site-wide settings. The canonical URL comes from NEXT_PUBLIC_SITE_URL so
 * preview deployments never leak the production domain into their metadata.
 */
export const site = {
  name: "DevFest Ogbomoso",
  organization: "GDG Ogbomoso",
  organizationLongName: "Google Developer Group Ogbomoso",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://devfestogbomoso.com").replace(/\/$/, ""),
  locale: "en_NG",
  language: "en",
  /** X (Twitter) handle used in Twitter card metadata. */
  twitterHandle: "@gdgogbomoso",
  /** Contact email shown in the footer and JSON-LD. TODO(2026): add the official address. */
  contactEmail: null as string | null,
  keywords: [
    "DevFest Ogbomoso",
    "DevFest Ogbomoso 2026",
    "GDG Ogbomoso",
    "Google Developer Group Ogbomoso",
    "DevFest Nigeria",
    "tech conference Ogbomoso",
    "developer conference Nigeria",
    "Gemini workshop Nigeria",
    "Ogbomoso tech community",
  ],
} as const;

export const socials: SocialLink[] = [
  { platform: "x", label: "GDG Ogbomoso on X", href: "https://x.com/gdgogbomoso" },
  // TODO(2026): add LinkedIn / Instagram / YouTube if the chapter uses them.
];

/** Primary navigation. `href` values are anchors on the home page. */
export const nav: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Team", href: "/#team" },
  { label: "FAQ", href: "/#faqs" },
];

/** Extra footer links for pages that aren't part of the main navigation. */
export const secondaryNav: NavItem[] = [
  { label: "Create your DP", href: "/dp" },
  { label: "Memories", href: "/memories" },
  { label: "Code of conduct", href: "/code-of-conduct" },
];

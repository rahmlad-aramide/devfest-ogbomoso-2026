import type { Speaker } from "./types";

/**
 * DevFest 2026 speakers. Empty until the lineup is announced: the Speakers section
 * shows its coming-soon state while `event.sections.speakers === "coming-soon"`.
 *
 * To add a speaker: drop a photo in /public/images/speakers-2026/ (640×800 works well,
 * webp), add an entry below, then set `event.sections.speakers` to "published".
 */
export const speakers: Speaker[] = [
  // {
  //   id: "jane-doe",
  //   name: "Jane Doe",
  //   role: "Staff Engineer",
  //   company: "Acme",
  //   photo: "/images/speakers-2026/jane-doe.webp",
  //   bio: "One or two sentences.",
  //   sessionIds: ["opening-keynote"],
  //   socials: [{ platform: "x", label: "Jane on X", href: "https://x.com/jane" }],
  // },
];

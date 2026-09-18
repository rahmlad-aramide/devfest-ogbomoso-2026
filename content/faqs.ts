import { event } from "./event";
import { site } from "./site";
import type { Faq } from "./types";
import { formatEventDate, formatEventTimeRange, isVenueAnnounced } from "@/lib/format";

/**
 * Rewritten for the single-day 2026 format. Answers that depend on event data are built
 * from `content/event.ts`, so they update automatically. Optional entries appear only
 * when their link is set in `event.links`.
 */
export const faqs: Faq[] = [
  {
    question: "What is DevFest Ogbomoso?",
    answer:
      "DevFest Ogbomoso is a community-led developer conference run by GDG Ogbomoso. It brings together developers, designers, students and builders for talks and hands-on workshops on AI, cloud, mobile and web.",
  },
  {
    question: "When and where is it happening?",
    answer: `${event.fullName} is a one-day event on ${formatEventDate()}, ${formatEventTimeRange()}, in ${event.venue.city}, ${event.venue.state}. ${
      isVenueAnnounced()
        ? `The venue is ${event.venue.name}.`
        : "The venue will be announced soon. Follow us for the reveal."
    }`,
  },
  {
    question: "Who can attend?",
    answer:
      "Anyone curious about technology: professional developers, non-traditional developers, students, founders, and \"Builders\" who create with dev tools, AI or no-code without calling themselves developers. Everyone is welcome.",
  },
  {
    question: "How do I register?",
    answer:
      "RSVP on the official GDG event page using the RSVP button on this site. Spots are limited, so register early.",
  },
  {
    // TODO(2026): confirm check-in requirements with the organizing team.
    question: "What should I bring?",
    answer:
      "Your laptop and charger for the hands-on workshop sessions, something to take notes with, and your RSVP confirmation on your phone.",
  },
  ...(event.links.callForSpeakers
    ? [
        {
          question: "How can I become a speaker?",
          answer: `Our call for speakers is open. Submit your proposal through the speaker form: ${event.links.callForSpeakers}`,
        },
      ]
    : []),
  ...(event.links.volunteer
    ? [
        {
          question: "Can I volunteer?",
          answer: `Yes! Sign up through the volunteer form: ${event.links.volunteer}`,
        },
      ]
    : []),
  {
    question: "How should I conduct myself at the event?",
    answer:
      "Everyone (attendees, speakers, volunteers and partners) is expected to be respectful and make others feel welcome and safe. Harassment of any kind is not tolerated.",
  },
  {
    question: "Where can I get updates?",
    answer: `Right here on the official website, which we update as the speakers, schedule and venue are confirmed. You can also follow ${site.twitterHandle} on X for real-time announcements.`,
  },
];

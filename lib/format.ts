import { event } from "@/content/event";

const tz = event.timezone;

const dateLong = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: tz,
});

const dateShort = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: tz,
});

const time = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: tz,
});

const tzName = new Intl.DateTimeFormat("en-US", { timeZoneName: "short", timeZone: tz });

const startDate = new Date(event.start);
const endDate = new Date(event.end);

/** "Saturday, October 17, 2026" */
export const formatEventDate = () => dateLong.format(startDate);

/** "Oct 17, 2026" */
export const formatEventDateShort = () => dateShort.format(startDate);

/** "GMT+1" */
export const eventTimezoneLabel = () =>
  tzName.formatToParts(startDate).find((p) => p.type === "timeZoneName")?.value ?? tz;

/** "9:00 AM – 4:00 PM (GMT+1)" */
export const formatEventTimeRange = () =>
  `${time.format(startDate)} – ${time.format(endDate)} (${eventTimezoneLabel()})`;

/** "09:30" → "9:30 AM" (schedule times are local to the event timezone). */
export function formatSessionTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}

export const isVenueAnnounced = () => event.venue.name.trim().toUpperCase() !== "TBA";

/** Human label that never prints the literal "TBA". */
export const venueLabel = () =>
  isVenueAnnounced() ? event.venue.name : "Venue to be announced";

/** "Ogbomoso, Oyo State" */
export const cityLabel = () => `${event.venue.city}, ${event.venue.state}`;

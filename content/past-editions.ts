/**
 * Look-back content: gives visitors something to see while the 2026 lineup is still
 * being confirmed. Carried over from the 2025 site and corrected (see notes).
 */

export interface Photo {
  src: string;
  alt: string;
  caption: string;
}

/**
 * Gallery from DevFest Ogbomoso 2024 (Saturday 30 November 2024, LAUTECH, Ogbomoso).
 * The 2025 site captioned these inconsistently ("'23" / "'24"); they are 2024.
 * TODO(2026): add DevFest 2025 photos. None were in the old repo.
 */
export const throwback = {
  show: true,
  year: 2024,
  title: "Throwback to DevFest '24",
  subtitle:
    "The energy, the people, the jollof, the pure tech vibes. Here's a look at how we showed up last time.",
  /** TODO(2026): confirm which edition this Google Photos album belongs to before linking it. */
  albumUrl: null as string | null,
  photos: [
    { src: "/images/devfest-2024/01-keynote.webp", alt: "A speaker delivering the keynote to a packed hall", caption: "Sodiq Akinjobi, GDG Regional Lead, delivering the keynote" },
    { src: "/images/devfest-2024/02-group-photo.webp", alt: "Group photo of DevFest 2024 attendees", caption: "Faces of the attendees at DevFest '24" },
    { src: "/images/devfest-2024/03-check-in.webp", alt: "Volunteers checking attendees in at the registration desk", caption: "Volunteers on duty, checking attendees in" },
    { src: "/images/devfest-2024/04-lead-organizers.webp", alt: "GDG Ogbomoso lead organizers posing with a guest", caption: "GDG Ogbomoso lead organizers with Sodiq Akinjobi" },
    { src: "/images/devfest-2024/05-gdg-leads.webp", alt: "Past and present LAUTECH GDG on Campus leads", caption: "LAUTECH past and present GDG on Campus leads" },
    { src: "/images/devfest-2024/06-organizers-prep.webp", alt: "Organizers working on laptops in the hall", caption: "Organizers preparing for the next sessions" },
    { src: "/images/devfest-2024/07-gaming-session.webp", alt: "A host anchoring an audience quiz game", caption: "The gaming session, live on Menti" },
    { src: "/images/devfest-2024/08-organizers-in-action.webp", alt: "Collage of organizers on stage", caption: "Organizers in action" },
    { src: "/images/devfest-2024/09-session-recap.webp", alt: "A speaker's session recap on the projector screen", caption: "A session recap on the big screen" },
  ] satisfies Photo[],
};

/** Short highlight reel from DevFest Ogbomoso 2023 (silent, ~40s, 848×480). */
export const recapVideo = {
  src: "/video/devfest-2023-recap.mp4",
  poster: "/video/devfest-2023-recap-poster.jpg",
  year: 2023,
};

export interface PastSpeaker {
  name: string;
  role: string;
  company?: string;
  photo: string;
  session: string;
  track: string;
}

/**
 * DevFest Ogbomoso 2025 lineup (5-6 December 2025). Recovered from the old repo's git history.
 * Shown as "Previously on the DevFest stage" until 2026 speakers are announced.
 */
export const speakers2025: PastSpeaker[] = [
  { name: "Ahm'd Olanrewaju", role: "Fullstack Software Engineer", company: "INDICINA", photo: "/images/speakers-2025/ahmd-olanrewaju.webp", track: "AI and Cloud", session: "Hands-On with Gemini and Google ADK: Building Full-Stack AI Agents MaaS" },
  { name: "Ojo Ilesanmi", role: "Java Backend Engineer", company: "ATBTech", photo: "/images/speakers-2025/ojo-ilesanmi.webp", track: "AI and Cloud", session: "Building a Real-Time Fraud Detection System with AI and Cloud" },
  { name: "Esuola Daniel Okikiola", role: "Founder & Errand Boy", company: "Provolo", photo: "/images/speakers-2025/esuola-daniel.webp", track: "AI & ML", session: "The Fine Art of Prompting: Getting Unbeatable Results with Gemini" },
  { name: "Chukwuemeka Chukwurah", role: "Senior Software Engineer", company: "Rocksteady Technology", photo: "/images/speakers-2025/chukwuemeka-chukwurah.webp", track: "Cloud & DevOps", session: "From Logs to Insights: AI-Powered Observability with GCP" },
  { name: "David Oluwabusayo", role: "CTO", company: "Paperless", photo: "/images/speakers-2025/david-oluwabusayo.webp", track: "Engineering and Security", session: "Flutter + WebAssembly: Building High-Performance Cross-Platform Apps" },
  { name: "Adeniji Oluwaferanmi", role: "Software Engineer", company: "Moniepoint", photo: "/images/speakers-2025/adeniji-oluwaferanmi.webp", track: "Engineering and Security", session: "Migration to Microfrontends" },
  { name: "Boluwatife Olaifa", role: "Software Engineer", company: "Wewire", photo: "/images/speakers-2025/boluwatife-olaifa.webp", track: "Engineering", session: "Becoming a 10x engineer with AI" },
  { name: "Timothy Ogundipe", role: "Product Designer", company: "Grey", photo: "/images/speakers-2025/timothy-ogundipe.webp", track: "Design and Product", session: "Designing the Invisible: Prototyping Trust and Feedback in Intelligent Interfaces" },
  { name: "Oluwatobi Immanuel", role: "Founder", company: "Concreap Technology Solutions", photo: "/images/speakers-2025/oluwatobi-immanuel.webp", track: "Design and Product", session: "Design: Intentional Creativity, Not Automation" },
  { name: "Titcombe Michael", role: "CEO / Brand Identity Designer", company: "HUELUMINATE", photo: "/images/speakers-2025/titcombe-michael.webp", track: "Design and Product", session: "Designing Trust: Building Human-Centered Brands and Interfaces in the Age of AI" },
  { name: "Tope James Moses", role: "Co-Founder", company: "ATC Africa", photo: "/images/speakers-2025/tope-james.webp", track: "Community", session: "Community & People: Leveraging Community for Growth" },
  { name: "Joy Ndukwe", role: "Community Manager & Content Creator", company: "Independent", photo: "/images/speakers-2025/joy-ndukwe.webp", track: "AI & Community", session: "How AI Is Powering the Future of Communities: Lessons for Builders & Creators" },
  { name: "Paul Edward", role: "CTO", company: "Afrinvest West Africa", photo: "/images/speakers-2025/paul-edward.webp", track: "Pre-DevFest series", session: "Scaling Databases for the Future: Strategies That Power Millions" },
  { name: "Asoluka Tochukwu Austin", role: "CTO, Co-founder", company: "Preview AI", photo: "/images/speakers-2025/asoluka-tochukwu.webp", track: "Pre-DevFest series", session: "Testing the Limits of Frontier AI Models" },
  { name: "Tashinga Pemhiwa", role: "Android Technology Lead", company: "Absa", photo: "/images/speakers-2025/tashinga-pemhiwa.webp", track: "Pre-DevFest series", session: "AI on Android: Enriching User Experience on Africa's Mobile Platform of Choice" },
  { name: "Ridwan Adewole", role: "Software Engineer", company: "AlgramX", photo: "/images/speakers-2025/ridwan-adewole.webp", track: "Pre-DevFest series", session: "Welcome to Web3: The Internet of Ownership, Trust, and Transparency" },
];

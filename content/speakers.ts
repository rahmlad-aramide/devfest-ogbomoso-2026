import type { Speaker } from "./types";

/**
 * DevFest Ogbomoso 2026 speakers, transcribed from the 2026 speaker announcement graphics
 * (public/images/speakers-2026/Speaker 1.png … Speaker 15.png, checked 2026-10-07). Photos are
 * cropped from those same graphics. `sessionIds` link back to content/schedule.ts.
 *
 * Glory Olaifa (day 1 welcome) and Sodiq Akinjobi (day 2 keynote) have no announcement graphic
 * yet, so they stay as plain `speakerNames` on their sessions until a photo/profile exists.
 */
export const speakers: Speaker[] = [
  {
    id: "samuel-abada",
    name: "Samuel Abada",
    role: "Senior Mobile Engineer",
    company: "Busha",
    photo: "/images/speakers-2026/samuel-abada.webp",
    sessionIds: ["d1-track1-agent-skills"],
  },
  {
    id: "david-oluwabusayo",
    name: "David Oluwabusayo",
    role: "CTO",
    company: "Paperless",
    photo: "/images/speakers-2026/david-oluwabusayo.webp",
    sessionIds: ["d1-track1-on-device-ai-flutter"],
  },
  {
    id: "mbaoma-mary",
    name: "Mary Mbaoma",
    role: "Cloud Engineer",
    photo: "/images/speakers-2026/mbaoma-mary.webp",
    sessionIds: ["d1-track1-auto-mode-vpc"],
  },
  {
    id: "dami-oshun",
    name: "Dami Oshun",
    role: "Software Engineer",
    company: "Seamless Technologies",
    photo: "/images/speakers-2026/dami-oshun.webp",
    sessionIds: ["d1-track2-context-engineering-adk"],
  },
  {
    id: "auwal-ms",
    name: "Auwal MS",
    role: "Lead, Developer Relations & Integrations",
    company: "Moniepoint Group",
    photo: "/images/speakers-2026/auwal-ms.webp",
    sessionIds: ["d1-track2-hybrid-ai-web"],
  },
  {
    id: "miracle-olabode",
    name: "Miracle Olabode",
    role: "GDE",
    company: "Google Cloud",
    photo: "/images/speakers-2026/miracle-olabode.webp",
    sessionIds: ["d1-track2-antigravity-pipelines"],
  },
  {
    id: "mustapha-adekunle",
    name: "Mustapha Adekunle",
    role: "GDE",
    company: "Google Cloud",
    photo: "/images/speakers-2026/mustapha-adekunle.webp",
    sessionIds: ["d1-track3-antigravity-cli"],
  },
  {
    id: "christopher-nwosu-madueke",
    name: "Christopher Nwosu-Madueke",
    role: "Senior Mobile Engineer",
    photo: "/images/speakers-2026/christopher-nwosu-madueke.webp",
    sessionIds: ["d1-track3-flutter-telemetry"],
  },
  {
    id: "saheed-adewumi",
    name: "Saheed Adewumi",
    role: "CTO & Co-Founder",
    company: "QT Solution Services · GDE, Cloud AI",
    photo: "/images/speakers-2026/saheed-adewumi.webp",
    sessionIds: ["d1-track3-cloud-sql-webapp"],
  },
  {
    id: "kehinde-quyum",
    name: "Kehinde, Quyum",
    role: "Software Engineer",
    company: "Terrace",
    photo: "/images/speakers-2026/kehinde-quyum.webp",
    sessionIds: ["d2-fireside-chat"],
  },
  {
    id: "ibekwe-adaeze",
    name: "Ibekwe Adaeze",
    role: "Founder and Product Manager",
    company: "NoonprepAI",
    photo: "/images/speakers-2026/ibekwe-adaeze.webp",
    sessionIds: ["d2-problem-to-product"],
  },
  {
    id: "okanlawon-jamiu",
    name: "Okanlawon Jamiu",
    role: "Developer Advocate",
    company: "Serverpod",
    photo: "/images/speakers-2026/okanlawon-jamiu.webp",
    sessionIds: ["d2-ai-moving-fast"],
  },
  {
    id: "mileke-kolawole",
    name: "Mileke Kolawole",
    role: "Cloud Engineer",
    company: "DigiTax",
    photo: "/images/speakers-2026/mileke-kolawole.webp",
    sessionIds: ["d2-agentic-sre-gke"],
  },
  {
    id: "esiebo-oluwabamikemi",
    name: "Esiebo Oluwabamikemi",
    role: "CGO",
    company: "MiddlePay",
    photo: "/images/speakers-2026/esiebo-oluwabamikemi.webp",
    sessionIds: ["d2-contributor-pipeline"],
  },
  {
    id: "olasupo-funke",
    name: "Olasupo Funke",
    role: "Technical Writer",
    company: "Rocket.Chat",
    photo: "/images/speakers-2026/olasupo-funke.webp",
    sessionIds: ["d2-code-is-cheap"],
  },
];

import type { TeamMember, TeamName, VolunteerTeam } from "./types";

/**
 * Organizers, carried over from the 2025 site (TODO(2026): confirm it is current).
 * Volunteers live in `volunteerTeams` below.
 */
export const teamNames: TeamName[] = ["Organizers", "Media and Publicity", "Design", "Dev", "Programs", "Content"];

export const team: TeamMember[] = [
  { name: "Miracle Olabode", role: "Lead Organizer", photo: "/images/team/miracle-olabode.webp", teams: ["Organizers"] },
  { name: "Boluwatife Adebisi", role: "Lead Organizer", photo: "/images/team/boluwatife-adebisi.webp", teams: ["Organizers"] },
  { name: "Esuola Daniel", role: "Co-Organizer", photo: "/images/team/esuola-daniel.webp", teams: ["Organizers", "Design"], leadOf: ["Design"] },
  { name: "Glory Olaifa", role: "Co-Organizer", photo: "/images/team/glory-olaifa.webp", teams: ["Organizers"], leadOf: ["Programs"] },
  { name: "Blessed-Agboola Jesujoba", role: "Co-Organizer", photo: "/images/team/blessed-agboola-jesujoba.webp", teams: ["Organizers", "Media and Publicity", "Dev"], leadOf: ["Media and Publicity"] },
  { name: "Abdrahman Oladimeji", role: "Co-Organizer", photo: "/images/team/abdrahman-oladimeji.webp", teams: ["Organizers", "Dev"], leadOf: ["Dev"] },
];

/** Photos for volunteers and leads who have one. Everyone else renders an initials avatar. */
export const volunteerPhotos: Record<string, string> = {
  "Hiqmah Gbadero": "/images/team/gbadero-hiqmah-fadeke.webp",
  "Peter Awoniyi": "/images/team/peter-awoniyi.webp",
  "Ridwan Adewole": "/images/team/adewole-ridwan.webp",
  "Elijah Ayanlere": "/images/team/elijah-ayanlere.webp",
};

/**
 * 2026 volunteer units, rosters and leads.
 */
export const volunteerTeams: VolunteerTeam[] = [
  {
    name: "Content Creation",
    focus: "Brand storytelling, live media coverage, design and post-event assets",
    purpose:
      "Amplify DevFest Ogbomoso across digital platforms before, during and after the event through visual design, photography, videography and social copy.",
    duties: [
      "Producing countdown creatives, speaker spotlight cards and promo videos",
      "Live coverage on both event days across X, Instagram and LinkedIn",
      "Capturing stage, crowd, breakout and sponsor booth photos and video",
      "Editing recap reels and highlights, and archiving assets for the community",
    ],
    leads: [
      { name: "Hiqmah Gbadero", photo: volunteerPhotos["Hiqmah Gbadero"] },
      { name: "Joshua Adesanwo" },
    ],
    groups: [
      {
        members: [
          "Adedoyin Solomon",
          "Anuoluwapo Esther",
          "Fawaz Ishola",
          "Gbolahan Adedamola",
          "Goodness Ajayi",
          "Jesutobi Jesse Blessed-Agboola",
          "Joel Akinrinde",
          "Joshua Ayinla",
          "Marvellous Adewuyi",
          "Peace Ogunkeye",
          "Paul Eniayewu",
          "Omotayo Blessing",
        ],
      },
    ],
  },
  {
    name: "Campus Liaison",
    focus: "Student body outreach, departmental publicity and student mobilization",
    purpose:
      "The bridge between the organizing committee and student communities across Ogbomoso, including LAUTECH, Federal Poly and nearby institutions.",
    duties: [
      "Driving student registrations and departmental awareness campaigns",
      "Partnering with departmental associations, tech clubs and hall executives",
      "Coordinating student arrivals, transit advice and on-campus info desks",
      "Tracking sentiment and student turnout ahead of the conference",
    ],
    leads: [{ name: "Peter Awoniyi", photo: volunteerPhotos["Peter Awoniyi"] }],
    groups: [{ members: ["Iminsioluwa Adedunmoye", "Mahfuz Asafa", "Peter Awoniyi", "Oluwapelumi"] }],
  },
  {
    name: "Operations (General)",
    focus: "Venue setup, logistics, crowd flow and crowd safety",
    purpose:
      "Orchestrate the physical and logistical side of the venue so the event runs smoothly from setup to load-out.",
    duties: [
      "Crowd movement, directional signage and crowd safety",
      "Vendor deliveries, refreshments and water stations, and power backups",
      "Rapid incident response and troubleshooting on both event days",
    ],
    leads: [],
    groups: [
      { name: "Logistics", lead: { name: "Favour Adebisi" }, members: ["Adetoye Festus Alvin", "Safia Abdoulaye", "Favour Adebisi"] },
      { name: "Welfare", lead: { name: "Oladoyin Olaniyi" }, members: ["Ogundapo Esther Eniola", "Omotolani Afolayan", "Fathia Abisola"] },
    ],
  },
  {
    name: "Technical",
    focus: "Venue setup, technical readiness, and stage, lighting and audio-visual setup",
    purpose: "",
    duties: [
      "Stage, seating, lighting and audio-visual setup across the main hall and breakout rooms",
      "Rapid incident response and troubleshooting on both event days",
    ],
    leads: [{ name: "Elijah Ayanlere", photo: volunteerPhotos["Elijah Ayanlere"] }],
    groups: [{ members: ["Elijah Ayanlere", "Oyeniyi Stephen", "Eyinade-Adekiitan Waliyat", "Enoch Gbadebo"] }],
  },
  {
    name: "Operations (Registration)",
    focus: "Attendee check-in, badge and swag issuance, and real-time attendance tracking",
    purpose: "Run the frontline arrival experience: a welcoming start to the event, with fast and accurate check-in.",
    duties: [
      "Operating the QR code and badge scanning system",
      "Issuing badges, name tags and welcome kits",
      "Handling queries, misplaced passes and walk-in accreditation",
      "Giving hourly check-in counts to the core operations team",
    ],
    leads: [],
    groups: [{ members: ["Peace Aina", "Tolulope Ayodeji", "Maimunat Lawal", "Precious Oluwakemi"] }],
  },
  {
    name: "Partnership (Speaker Support)",
    focus: "Speaker liaison, VIP hospitality, session timing and sponsor satisfaction",
    purpose: "Give guest speakers, workshop facilitators, sponsors and community VIPs a VIP experience throughout the conference.",
    duties: [
      "Speaker liaison: schedules, rehearsal checks, deck uploads and tech tests",
      "Welcoming speakers, running the green room and escorting them to stage",
      "Mic handling, audience Q&A coordination and timekeeping for session tracks",
      "Sponsor interactions, booth check-ins and post-session speaker feedback",
    ],
    leads: [{ name: "Habeeb Jimoh" }, { name: "Favour Alfred" }],
    groups: [
      {
        members: [
          "Favour Alfred",
          "Helen Ogundipe",
          "Oluwatosin Idowu",
          "Precious Adewale",
          "Ridwan Adewole",
          "Ugochukwu Omenka",
          "Mercy Adeyemo",
        ],
      },
    ],
  },
];

import type { TeamMember, TeamName } from "./types";

/**
 * TODO(2026): confirm this roster is current. It is carried over from the 2025 site.
 * Members without a `photo` render an initials avatar.
 */
export const teamNames: TeamName[] = ["Organizers", "Media and Publicity", "Design", "Dev"];

export const team: TeamMember[] = [
  { name: "Miracle Olabode", role: "Lead Organizer", photo: "/images/team/miracle-olabode.webp", teams: ["Organizers"] },
  { name: "Boluwatife Adebisi", role: "Lead Organizer", photo: "/images/team/boluwatife-adebisi.webp", teams: ["Organizers"] },
  { name: "Esuola Daniel", role: "Co-Organizer", photo: "/images/team/esuola-daniel.webp", teams: ["Organizers", "Design"], leadOf: ["Design"] },
  { name: "Glory Olaifa", role: "Co-Organizer", photo: "/images/team/glory-olaifa.webp", teams: ["Organizers"] },
  { name: "Blessed-Agboola Jesujoba", role: "Co-Organizer", photo: "/images/team/blessed-agboola-jesujoba.webp", teams: ["Organizers", "Media and Publicity", "Dev"], leadOf: ["Media and Publicity"] },
  { name: "Abdrahman Oladimeji", role: "Co-Organizer", photo: "/images/team/abdrahman-oladimeji.webp", teams: ["Organizers", "Dev"], leadOf: ["Dev"] },
  { name: "Adewole Ridwan", role: "Member", photo: "/images/team/adewole-ridwan.webp", teams: ["Dev"] },
  { name: "Afolabi William", role: "Member", teams: ["Dev"] },
  { name: "Isaac Oke", role: "Member", photo: "/images/team/isaac-oke.webp", teams: ["Design"] },
  { name: "Olatunji Ezekiel", role: "Member", photo: "/images/team/olatunji-ezekiel.webp", teams: ["Design"] },
  { name: "Olurinto Boluwatife", role: "Member", photo: "/images/team/olurinto-boluwatife.webp", teams: ["Design"] },
  { name: "Eniola Adesina", role: "Member", photo: "/images/team/eniola-adesina.webp", teams: ["Media and Publicity"] },
  { name: "Peter Awoniyi", role: "Member", photo: "/images/team/peter-awoniyi.webp", teams: ["Media and Publicity"] },
  { name: "Gbadero Hiqmah Fadeke", role: "Member", photo: "/images/team/gbadero-hiqmah-fadeke.webp", teams: ["Media and Publicity"] },
  { name: "Babatunde Abdullah", role: "Member", teams: ["Media and Publicity"] },
];

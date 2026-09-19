import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import { team } from "@/content/team";

export function Team() {
  const organizers = team.filter((m) => m.teams.includes("Organizers"));
  const rest = team.filter((m) => !m.teams.includes("Organizers"));

  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="team-title"
          title="The people behind DevFest"
          description="GDG Ogbomoso organizers and volunteers who give their time to make this happen."
        />

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {organizers.map((m) => (
            <li key={m.name}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-soft">
                  {m.photo ? (
                    <Image src={m.photo} alt="" fill sizes="(min-width: 1024px) 170px, 45vw" className="object-cover object-top" />
                  ) : null}
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg leading-tight font-bold text-navy">{m.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{m.role}</p>
                  {m.leadOf?.length ? (
                    <p className="text-sm font-semibold text-link">Leads {m.leadOf.join(" and ")}</p>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 font-display text-2xl font-extrabold text-navy">Volunteers and team members</h3>
        <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((m) => (
            <li key={m.name} className="flex items-center gap-4">
              <PersonAvatar name={m.name} photo={m.photo} size={52} />
              <div>
                <p className="font-semibold text-navy">{m.name}</p>
                <p className="text-sm text-muted">{m.teams.join(", ")} team</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

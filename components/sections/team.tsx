import Image from "next/image";
import { Container } from "@/components/ui/container";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { SectionHeading } from "@/components/ui/section-heading";
import { team, volunteerPhotos, volunteerTeams } from "@/content/team";
import type { VolunteerLead, VolunteerTeam } from "@/content/types";

export function Team() {
  const organizers = team.filter((m) => m.teams.includes("Organizers"));
  const volunteerCount = new Set(volunteerTeams.flatMap((t) => t.groups.flatMap((g) => g.members))).size;

  return (
    <section id="team" aria-labelledby="team-title" className="py-20 sm:py-28">
      <Container>
        {/* eslint-disable-next-line @next/next/no-img-element -- static local SVG, next/image can't serve SVG (see next.config.ts) */}
        <img src="/brand/gdg-ogbomoso-full.svg" alt="Google Developer Groups Ogbomoso" className="h-7 w-auto sm:h-8" />
        <SectionHeading
          id="team-title"
          title="The people behind DevFest"
          description="GDG Ogbomoso organizers and volunteers who give their time to make this happen."
          className="mt-5"
        />

        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
          {organizers.map((m) => (
            <li key={m.name}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-soft">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 170px, 45vw"
                      className="object-cover object-top"
                    />
                  ) : null}
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg leading-tight font-bold text-navy">
                    {m.name}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{m.role}</p>
                  {m.leadOf?.length ? (
                    <p className="text-sm font-semibold text-link">
                      {m.leadOf.join(" and ")} Lead{" "}
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <h3 className="mt-16 font-display text-2xl font-extrabold text-navy">Volunteers</h3>
        <p className="mt-2 text-muted">
          {volunteerCount} volunteers across {volunteerTeams.length} teams.
        </p>
        <ul className="mt-8 grid items-start gap-6 lg:grid-cols-2">
          {volunteerTeams.map((t) => (
            <VolunteerCard key={t.name} unit={t} />
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Lead({ lead, fallbackLabel }: { lead: VolunteerLead; fallbackLabel: string }) {
  return (
    <li className="flex items-center gap-3">
      <PersonAvatar name={lead.name} photo={lead.photo ?? volunteerPhotos[lead.name]} size={44} className="ring-2 ring-google-yellow" />
      <div>
        <p className="leading-tight font-semibold text-navy">{lead.name}</p>
        <p className="text-sm font-semibold text-link">{lead.label ? `${lead.label} lead` : fallbackLabel}</p>
      </div>
    </li>
  );
}

function VolunteerCard({ unit }: { unit: VolunteerTeam }) {
  const count = new Set(unit.groups.flatMap((g) => g.members)).size;

  return (
    <li className="flex flex-col rounded-3xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <h4 className="font-display text-xl leading-tight font-extrabold text-navy">{unit.name}</h4>
        <span className="shrink-0 rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-link">{count} members</span>
      </div>
      <p className="mt-2 text-muted">{unit.focus}</p>

      {unit.leads.length ? (
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
          {unit.leads.map((lead) => (
            <Lead key={lead.name} lead={lead} fallbackLabel={unit.leads.length > 1 ? "Co-lead" : "Team lead"} />
          ))}
        </ul>
      ) : null}

      <div className="mt-5 space-y-4">
        {unit.groups.map((group) => {
          const leadName = group.lead?.name;
          const members = group.members.filter((m) => m !== leadName && !unit.leads.some((l) => l.name === m));
          return (
            <div key={group.name ?? "all"}>
              {group.name ? (
                <p className="mb-2 text-sm font-bold tracking-wide text-navy uppercase">
                  {group.name}
                  {leadName ? <span className="font-medium tracking-normal text-link normal-case"> · Lead: {leadName}</span> : null}
                </p>
              ) : null}
              <ul className="flex flex-wrap gap-2">
                {members.map((name) => (
                  <li key={name} className="flex items-center gap-2 rounded-full bg-canvas py-1 pr-3 pl-1 text-sm text-ink">
                    <PersonAvatar name={name} photo={volunteerPhotos[name]} size={28} />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <details className="group mt-5 border-t border-line pt-4 text-sm">
        <summary className="cursor-pointer font-semibold text-link marker:content-none after:ml-1 after:content-['+'] group-open:after:content-['\2212']">
          What this team does
        </summary>
        <p className="mt-3 text-muted">{unit.purpose}</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-ink">
          {unit.duties.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </details>
    </li>
  );
}

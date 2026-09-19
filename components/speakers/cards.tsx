import Image from "next/image";
import { SocialIcon } from "@/components/ui/social-icon";
import type { PastSpeaker } from "@/content/past-editions";
import type { Session, Speaker } from "@/content/types";
import { formatSessionTime } from "@/lib/format";

export function SpeakerCard({ speaker, sessions = [] }: { speaker: Speaker; sessions?: Session[] }) {
  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-soft">
        {speaker.photo ? (
          <Image src={speaker.photo} alt="" fill sizes="(min-width: 1024px) 260px, 45vw" className="object-cover object-top" />
        ) : null}
      </div>
      <figcaption className="mt-3">
        <p className="font-display text-lg leading-tight font-bold text-navy">{speaker.name}</p>
        <p className="mt-0.5 text-sm text-muted">
          {speaker.role}
          {speaker.company ? `, ${speaker.company}` : ""}
        </p>
        {sessions.map((s) => (
          <p key={s.id} className="mt-2 text-sm text-ink/80">
            <span className="font-semibold text-link">{formatSessionTime(s.start)}</span> {s.title}
          </p>
        ))}
        {speaker.bio ? <p className="mt-2 text-sm leading-relaxed text-muted">{speaker.bio}</p> : null}
        {speaker.socials?.length ? (
          <ul className="mt-3 flex gap-2">
            {speaker.socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid size-8 place-items-center rounded-full border border-line text-muted hover:border-primary hover:text-primary"
                >
                  <SocialIcon platform={s.platform} className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </figcaption>
    </figure>
  );
}

export function PastSpeakerCard({ speaker, compact = false }: { speaker: PastSpeaker; compact?: boolean }) {
  return (
    <figure>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-primary-soft">
        <Image
          src={speaker.photo}
          alt=""
          fill
          sizes={compact ? "208px" : "(min-width: 1024px) 260px, 45vw"}
          className="object-cover object-top"
        />
      </div>
      <figcaption className="mt-3">
        <p className="font-display text-lg leading-tight font-bold text-navy">{speaker.name}</p>
        <p className="mt-0.5 text-sm text-muted">
          {speaker.role}
          {speaker.company ? `, ${speaker.company}` : ""}
        </p>
        <p className={compact ? "mt-2 line-clamp-2 text-sm text-ink/80" : "mt-2 text-sm text-ink/80"}>
          {speaker.session}
        </p>
      </figcaption>
    </figure>
  );
}

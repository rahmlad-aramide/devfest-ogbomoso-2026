import type { Session, SessionKind } from "@/content/types";
import { speakers } from "@/content/speakers";
import { cn } from "@/lib/cn";
import { formatSessionTime } from "@/lib/format";

const kindLabel: Record<SessionKind, string> = {
  keynote: "Keynote",
  talk: "Talk",
  workshop: "Workshop",
  panel: "Panel",
  break: "Break",
  social: "Social",
  sponsor: "Sponsor",
  tbd: "To be announced",
};

const quietKinds: SessionKind[] = ["break", "social", "tbd"];

interface Slot {
  start: string;
  end: string;
  sessions: Session[];
}

/** Groups consecutive same-time sessions so concurrent breakout rooms render side by side. */
function groupByTime(sessions: Session[]): Slot[] {
  const slots: Slot[] = [];
  for (const s of sessions) {
    const last = slots[slots.length - 1];
    if (last && last.start === s.start && last.end === s.end) {
      last.sessions.push(s);
    } else {
      slots.push({ start: s.start, end: s.end, sessions: [s] });
    }
  }
  return slots;
}

function SessionBody({ s }: { s: Session }) {
  const speakerName = (id: string) => speakers.find((sp) => sp.id === id)?.name;
  const names = (s.speakerIds ?? []).map(speakerName).filter(Boolean);
  const displayNames = names.length > 0 ? names : s.speakerNames ?? [];
  const quiet = quietKinds.includes(s.kind);

  return (
    <div>
      <h3 className={cn("font-display text-xl font-bold", quiet ? "text-muted" : "text-navy")}>{s.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {[kindLabel[s.kind], s.track, s.room].filter(Boolean).join(" · ")}
      </p>
      {displayNames.length > 0 ? <p className="mt-1 text-ink/80">{displayNames.join(", ")}</p> : null}
      {s.description ? <p className="mt-2 max-w-prose text-muted">{s.description}</p> : null}
    </div>
  );
}

/** A time-ordered list of sessions. Sessions sharing a start/end render as parallel breakout cards. */
export function Timeline({ sessions }: { sessions: Session[] }) {
  const slots = groupByTime(sessions);

  return (
    <ol className="divide-y divide-line border-y border-line">
      {slots.map((slot) => (
        <li key={`${slot.start}-${slot.end}`} className="grid gap-1 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
          <p className="font-semibold text-link tabular-nums">
            {formatSessionTime(slot.start)} – {formatSessionTime(slot.end)}
          </p>
          {slot.sessions.length === 1 ? (
            <SessionBody s={slot.sessions[0]} />
          ) : (
            <div>
              {slot.sessions[0].room ? (
                <p className="text-xs font-semibold tracking-wide text-muted uppercase">{slot.sessions[0].room}</p>
              ) : null}
              <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {slot.sessions.map((s) => (
                  <div key={s.id} className="rounded-2xl border border-line bg-surface p-4">
                    <SessionBody s={s} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

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
};

/** A single-day, time-ordered list of sessions. */
export function Timeline({ sessions }: { sessions: Session[] }) {
  const speakerName = (id: string) => speakers.find((s) => s.id === id)?.name;

  return (
    <ol className="divide-y divide-line border-y border-line">
      {sessions.map((s) => {
        const names = (s.speakerIds ?? []).map(speakerName).filter(Boolean);
        const quiet = s.kind === "break" || s.kind === "social";
        return (
          <li key={s.id} className="grid gap-1 py-6 sm:grid-cols-[11rem_1fr] sm:gap-8">
            <p className="font-semibold text-primary tabular-nums">
              {formatSessionTime(s.start)} – {formatSessionTime(s.end)}
            </p>
            <div>
              <h3 className={cn("font-display text-xl font-bold", quiet ? "text-muted" : "text-navy")}>{s.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {[kindLabel[s.kind], s.track, s.room].filter(Boolean).join(" · ")}
              </p>
              {names.length > 0 ? <p className="mt-1 text-ink/80">{names.join(", ")}</p> : null}
              {s.description ? <p className="mt-2 max-w-prose text-muted">{s.description}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

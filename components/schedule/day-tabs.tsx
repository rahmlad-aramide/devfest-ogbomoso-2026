"use client";

import { useState } from "react";
import { Timeline } from "@/components/schedule/timeline";
import type { Session } from "@/content/types";
import { cn } from "@/lib/cn";
import { dayVenueLabel, formatDayDate } from "@/lib/format";

const days: Array<{ id: 1 | 2; label: string; sub: string }> = [
  { id: 1, label: "Day 1", sub: "Workshops & Codelabs" },
  { id: 2, label: "Day 2", sub: "Main Conference" },
];

/** Tabs between the two event days. Both day panels render in the DOM; only the active one is shown. */
export function DayTabs({ sessions }: { sessions: Session[] }) {
  const [active, setActive] = useState<1 | 2>(1);

  return (
    <div>
      <div role="tablist" aria-label="Agenda day" className="inline-flex flex-wrap gap-2 rounded-full bg-surface-2 p-1.5">
        {days.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            aria-selected={active === d.id}
            onClick={() => setActive(d.id)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors",
              active === d.id ? "bg-primary text-white" : "text-muted hover:text-ink",
            )}
          >
            {d.label} <span className="hidden sm:inline">· {d.sub}</span>
          </button>
        ))}
      </div>

      {days.map((d) => (
        <div key={d.id} id={`day-${d.id}-panel`} role="tabpanel" hidden={active !== d.id} className="mt-10">
          <p className="text-sm font-medium text-muted">
            {formatDayDate(d.id)} · {dayVenueLabel(d.id)}
          </p>
          <div className="mt-6">
            <Timeline sessions={sessions.filter((s) => s.day === d.id)} />
          </div>
        </div>
      ))}
    </div>
  );
}

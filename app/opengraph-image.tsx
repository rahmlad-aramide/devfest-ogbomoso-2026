import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { event } from "@/content/event";
import { formatEventDate, venueLabel } from "@/lib/format";

export const alt = `${event.fullName}: ${event.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const load = (path: string) => readFile(join(/* turbopackIgnore: true */ process.cwd(), path));

export default async function OpengraphImage() {
  const [display, sans, chevrons] = await Promise.all([
    load("assets/fonts/bricolage-800.woff"),
    load("assets/fonts/geist-500.woff"),
    load("public/brand/gdg-chevrons.svg"),
  ]);
  const chevronsSrc = `data:image/svg+xml;base64,${Buffer.from(chevrons).toString("base64")}`;
  const dots = ["#4285f4", "#ea4335", "#fbbc04", "#34a853"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "white",
          background: "linear-gradient(135deg, #07142f 0%, #0b1f4d 55%, #1a56db 100%)",
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={chevronsSrc} width={84} height={50} alt="" />
          <div style={{ fontSize: 30, letterSpacing: 1, opacity: 0.9 }}>{event.organizer}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 132,
              lineHeight: 1,
              letterSpacing: -3,
              display: "flex",
            }}
          >
            DevFest
          </div>
          <div
            style={{
              fontFamily: "Bricolage",
              fontSize: 132,
              lineHeight: 1.05,
              letterSpacing: -3,
              color: "#fbbc04",
              display: "flex",
            }}
          >
            Ogbomoso {event.year}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 34 }}>
            <div style={{ display: "flex" }}>{formatEventDate()}</div>
            <div style={{ display: "flex", opacity: 0.75, fontSize: 28 }}>
              {venueLabel()} · {event.venue.city}, {event.venue.state}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {dots.map((c) => (
              <div key={c} style={{ width: 28, height: 28, borderRadius: 14, background: c, display: "flex" }} />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800, style: "normal" },
        { name: "Geist", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
}

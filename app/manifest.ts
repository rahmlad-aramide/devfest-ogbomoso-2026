import type { MetadataRoute } from "next";
import { event } from "@/content/event";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: event.fullName,
    short_name: site.name,
    description: event.summary,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    lang: site.language,
    background_color: "#f5f8ff",
    theme_color: "#f5f8ff",
    categories: ["events", "education", "technology"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

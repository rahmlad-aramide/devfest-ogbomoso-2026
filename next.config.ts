import type { NextConfig } from "next";
import { event } from "./content/event";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A stray lockfile exists higher up the tree; pin the workspace root to this project.
  turbopack: { root: process.cwd() },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // URLs from the 2025 site, kept alive so old links and search results still work.
  async redirects() {
    return [
      { source: "/team-members", destination: "/#team", permanent: true },
      { source: "/refferals", destination: "/", permanent: true },
      { source: "/preview", destination: "/", permanent: true },
      // Registration now lives on the GDG Bevy page.
      { source: "/register", destination: event.rsvpUrl, permanent: false },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Files in these folders are not content-hashed, so cache for 30 days rather than forever.
      {
        source: "/:folder(video|brand|icons)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;

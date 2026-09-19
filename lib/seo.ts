import type { Metadata } from "next";
import { event } from "@/content/event";
import { site } from "@/content/site";
import { formatEventDate } from "@/lib/format";

/** Absolute URL for a site path. `absoluteUrl("/")` → the bare site URL, no trailing slash. */
export function absoluteUrl(path = "/") {
  return path === "/" ? site.url : `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Only the production deployment should be indexed. Preview deployments and local
 * builds get `noindex` in both the robots meta tag and robots.txt.
 */
export function isIndexable() {
  const vercelEnv = process.env.VERCEL_ENV;
  return vercelEnv ? vercelEnv === "production" : process.env.NODE_ENV === "production";
}

/** ≤160 chars: the default <meta description> and social-card text. Date comes from content/event.ts. */
export const metaDescription = `${event.summary} ${formatEventDate()}.`;

export const defaultTitle = `${event.fullName} | Ogbomoso's Biggest Tech Gathering`;
export const titleTemplate = `%s | ${event.fullName}`;

export function fullTitle(title?: string) {
  return title ? titleTemplate.replace("%s", title) : defaultTitle;
}

/**
 * The generated social card (app/opengraph-image.tsx). Page-level `openGraph` / `twitter` replace the
 * layout's, which drops the auto-attached image, so pages must list it explicitly.
 */
export const socialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${event.fullName}: ${event.headline}`,
};

/** Open Graph defaults. Page-level `openGraph` replaces (not merges) the layout's, so repeat these. */
export const baseOpenGraph = {
  type: "website",
  siteName: `${event.fullName} · ${site.organization}`,
  locale: site.locale,
} as const;

interface PageMetadataInput {
  /** Page title without the site suffix, e.g. "Speakers". Omit for the home page. */
  title?: string;
  description?: string;
  /** Route path used for the canonical URL and og:url, e.g. "/speakers". */
  path: string;
  /** Keep the page out of search results (utility pages). Links are still followed. */
  noindex?: boolean;
}

/** Per-route metadata with a self-referencing canonical, Open Graph and Twitter tags. */
export function pageMetadata({
  title,
  description = metaDescription,
  path,
  noindex,
}: PageMetadataInput): Metadata {
  const shownTitle = fullTitle(title);
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title: shownTitle, description, url: path, images: [socialImage] },
    twitter: { card: "summary_large_image", title: shownTitle, description, images: [socialImage.url] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/**
 * Routes listed in sitemap.xml. Add a route here when its page ships.
 * `indexable` (default true) lets a page opt out while it has no real content yet, and it
 * must agree with the `noindex` flag passed to that page's `pageMetadata()`.
 */
export const sitemapRoutes: Array<{
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
  indexable?: boolean;
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/speakers", priority: 0.8, changeFrequency: "weekly", indexable: event.sections.speakers === "published" },
  { path: "/schedule", priority: 0.8, changeFrequency: "weekly", indexable: event.sections.schedule === "published" },
  { path: "/dp", priority: 0.6, changeFrequency: "monthly" },
  { path: "/memories", priority: 0.5, changeFrequency: "yearly" },
  { path: "/code-of-conduct", priority: 0.4, changeFrequency: "yearly" },
];

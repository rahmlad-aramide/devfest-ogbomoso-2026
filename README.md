# DevFest Ogbomoso 2026

Official website for DevFest Ogbomoso 2026, hosted by GDG Ogbomoso.
**Saturday, 17 October 2026 · 9:00 AM – 4:00 PM (GMT+1) · Ogbomoso, Oyo State.**

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and TypeScript.

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script          | What it does                 |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run start` | Serve the production build   |
| `npm run lint`  | ESLint                       |

## Project layout

```
app/          Routes, layouts and metadata files (robots, sitemap, manifest)
components/   ui/ (primitives), layout/ (header, footer), sections/ (page blocks)
content/      Everything that changes year to year: event, speakers, schedule, team, FAQs
lib/          Small helpers
public/       Static assets (brand/, images/)
```

## Updating content

All event details live in `content/`. Edit the data there. Components should
never hold copy, dates or links. Anything still unknown is marked `TODO(2026)`.

## Environment variables

| Name                   | Purpose                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, robots, JSON-LD |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console verification token                |

## SEO

Metadata, `robots.txt`, `sitemap.xml`, the web manifest, generated OG/Twitter images and
JSON-LD (Organization, WebSite, Event) are all driven by `content/`. Only the production
deployment is indexable. Vercel preview deployments and the dev server emit `noindex` and `Disallow: /`.
Helpers live in `lib/seo.ts` and `lib/structured-data.ts`.

## Registration

RSVP is handled on the GDG Bevy platform. The link is defined once in
`content/event.ts` and used by every call-to-action.

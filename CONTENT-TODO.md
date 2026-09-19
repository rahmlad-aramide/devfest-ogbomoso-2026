# Content to fill in for DevFest Ogbomoso 2026

Everything below is a `TODO(2026)` in the codebase. Edit the file named, and the site updates.

## Blocking / high priority

| Item | File | Notes |
| --- | --- | --- |
| **2026 DP frame artwork** | `content/dp.ts` → `frame` | The generator runs on a built-in placeholder frame (drawn in code from the event data). To use the official artwork, export a transparent 1080×1080 PNG with a hole for the photo, save it in `public/images/`, and set `frame` (the `src`, the photo `window`, and an optional `name` position). The instructions are in the file. |
| **Venue** | `content/event.ts` → `venue.name`, `address`, `mapUrl` | While `name` is `"TBA"` the UI shows "Venue to be announced" and the structured data names the place after the city ("Ogbomoso, Oyo State"). Both switch to the real name automatically. |
| **Speakers** | `content/speakers.ts`, then `event.sections.speakers = "published"` | Photos → `public/images/speakers-2026/` (640×800 webp). |
| **Schedule** | `content/schedule.ts`, then `event.sections.schedule = "published"` | Single day, times as `"HH:mm"`. |

## Verify

- **RSVP count** (`event.rsvps`): manually maintained, currently 359 as of 2026-09-18. Update from Bevy or set to `null`.
- **Team roster** (`content/team.ts`): carried over from 2025; confirm it is current. Two members have no photo.
- **"What should I bring?" FAQ** (`content/faqs.ts`): check-in requirements were assumed.
- **Code of conduct** (`content/code-of-conduct.ts`): standard wording written for the site. Have the organizers review it and add an official reporting contact.
- **Throwback album link** (`content/past-editions.ts` → `throwback.albumUrl`): the old Google Photos link was labelled '23 but sits beside '24 photos. Confirm the year before enabling.

## Before launch (SEO)

- Set `NEXT_PUBLIC_SITE_URL` in the production environment (defaults to `https://devfestogbomoso.com`).
- Optionally set `GOOGLE_SITE_VERIFICATION`, then submit `/sitemap.xml` in Google Search Console.
- When you add a page, also add its path to `sitemapRoutes` in `lib/seo.ts` and give it `pageMetadata({...})`.

## Publishing speakers and the schedule

`/speakers` and `/schedule` are `noindex` and left out of the sitemap while their section is `"coming-soon"`. Setting `event.sections.speakers` / `.schedule` to `"published"` in `content/event.ts` makes them indexable and adds them to `sitemap.xml` automatically.

## After the event (Oct 17, 2026)

The site switches itself once the end time in `content/event.ts` passes: the hero shows a thank-you message, every RSVP button becomes "See the memories", and the closing banner says thanks. The static copy does not change on its own, so refresh these by hand: the hero tagline (`event.headline`), the About text and the FAQ answers in `content/`.

## Hero background video

`app/page.tsx` renders `<Hero videoBackground />`, which plays `public/video/devfest-2023-recap.mp4` (footage from the **2023** edition, with 2023 banners visible). It only plays after the page has loaded and is skipped for visitors who choose reduced motion, have Data Saver on, or are on a 2G/3G-speed connection, who see the still photo (`event.heroImage`) instead. Swap in newer footage or use `<Hero />` for the photo only.

## Nice to have

- Official theme tagline (`event.themeTagline`), if GDG issues one.
- Call-for-speakers, volunteer and sponsor links (`event.links.*`). Related FAQs appear automatically once set.
- Contact email (`content/site.ts` → `contactEmail`).
- More social links (`content/site.ts` → `socials`).
- **DevFest 2025 photos.** None were in the old repo, so the throwback uses 2024 photos.
- Official DevFest 2026 logo/branding from GDG, if available.

## Deliberately not carried over from the 2025 site

- Two-day FAQ copy, `day` fields on speakers, the 2025 theme sentence, and the 2025 wordmark and lanyard.
- The placeholder testimonials ("Olusegun O.", "Veronica A."). They were not real quotes.
- `/register`, `/referrals` and the Railway backend (registration is on Bevy).
- The two 2025 save-the-date GIFs (10 MB combined) and all duplicate png/jpg/webp/avif copies.

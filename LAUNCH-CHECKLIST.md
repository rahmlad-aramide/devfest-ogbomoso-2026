# Launch checklist: DevFest Ogbomoso 2026

Work top to bottom. Content still to fill in is tracked in [`CONTENT-TODO.md`](./CONTENT-TODO.md).

## 1. Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes, in production** | `https://devfestogbomoso.com` (no trailing slash). It is baked in at **build time**, so set it *before* building. It drives canonical URLs, the sitemap, robots, Open Graph and JSON-LD. |
| `GOOGLE_SITE_VERIFICATION` | Optional | The `content="…"` token from Search Console's HTML-tag method. |

**Commit `assets/` and `public/brand/`.** The social card (`app/opengraph-image.tsx`) reads `assets/fonts/*.woff` and `public/brand/gdg-chevrons.svg` at **build time**. If they are missing from the checkout, the build fails. Check with `git ls-files assets public/brand`.

Requirements: Node.js 20.9 or newer (Next.js 16). Build: `npm ci && npm run build`. Serve: `npm run start`.

**Indexing is automatic.** Only the production deployment is indexable. On Vercel that means `VERCEL_ENV=production`; on other hosts, `NODE_ENV=production`. Preview deployments and `next dev` send `noindex` and `Disallow: /`.

## 2. Content gates (before announcing)

- [ ] Venue set in `content/event.ts` (`venue.name`, `address`, `mapUrl`).
- [ ] Speakers added, then `event.sections.speakers = "published"`.
- [ ] Schedule added, then `event.sections.schedule = "published"`. These two flips also add `/speakers` and `/schedule` to the sitemap.
- [ ] 2026 DP frame artwork configured in `content/dp.ts` (or knowingly launch with the built-in frame).
- [ ] Team roster confirmed (`content/team.ts`).
- [ ] Code of conduct reviewed by the organizers (`content/code-of-conduct.ts`).
- [ ] Decide on the hero: `app/page.tsx` renders `<Hero videoBackground />`, which uses **2023** footage. Keep it, swap the video, or use `<Hero />` (photo only).
- [ ] RSVP count (`event.rsvps`) refreshed or set to `null`.

## 3. DNS and hosting

- [ ] Point `devfestogbomoso.com` at the new deployment. This replaces the 2025 site.
- [ ] Redirect `www.devfestogbomoso.com` to the apex (canonicals use the apex).
- [ ] HTTPS on. The site sends HSTS with `includeSubDomains`, so confirm every subdomain of the domain serves HTTPS before going live.
- [ ] Old 2025 URLs are redirected already: `/team-members`, `/refferals`, `/preview` (permanent) and `/register` (to the Bevy RSVP page).

## 4. Verify on the live domain

- [ ] `/robots.txt` allows all and lists the sitemap. `/sitemap.xml` lists `/`, `/dp`, `/memories`, `/code-of-conduct`.
- [ ] `curl -I https://devfestogbomoso.com` shows the security headers, including `Content-Security-Policy`.
- [ ] Share `/` and `/dp` in WhatsApp and X and confirm the preview card appears.
- [ ] The RSVP button opens the Bevy page in a new tab.
- [ ] Countdown is running. DP generator: upload, download, and Share (on a phone).
- [ ] Google Rich Results Test on `/`: Event and FAQ structured data are detected with no errors. (Not run before launch: it needs the live URL or pasted HTML. Until the venue is announced, the Event location is named "Ogbomoso, Oyo State".)

## 5. Search Console

- [ ] Add the property and verify it (DNS record, or `GOOGLE_SITE_VERIFICATION`).
- [ ] Submit `https://devfestogbomoso.com/sitemap.xml`.
- [ ] Request indexing for `/` once the venue and lineup are live.

## 6. After the event (Oct 17, 2026)

The RSVP buttons, hero and closing banner switch to a thank-you state automatically. Refresh by hand the hero tagline, the About text and the FAQ answers in `content/`, and add the 2026 photos to `content/past-editions.ts`.

## Known limits

- **Lighthouse (mobile, throttled):** Accessibility, Best Practices and SEO score 100. Performance scores about 74 (LCP ≈ 3.8 s in the slow-4G simulation, real-browser LCP well under 1 s locally). The 2.2 MB hero video is the largest single cost on a slow connection. Using `<Hero />` removes it.
- **CSP** allows inline scripts and styles (`'unsafe-inline'`), which Next.js needs on statically rendered pages. Tightening it would require nonce-based dynamic rendering.
- Only one social platform (X) is linked; add more in `content/site.ts` once the accounts exist.

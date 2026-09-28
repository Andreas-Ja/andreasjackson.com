# andreasjackson.com

Personal portfolio site for Andreas (AJ) Jackson. Astro, static output, deployed
on **Cloudflare Workers** (not Pages) from this repo's `main` branch.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Deploy

Cloudflare's Workers Build watches `main`. **Committing is not enough: you must
push.** A `git push` triggers the build (`npm run build`, then
`npx wrangler deploy`) and the site is live a minute or two later.

Config lives in `wrangler.jsonc`:
- `assets.directory` is `./dist`
- `html_handling` is `drop-trailing-slash`, which matches Astro's
  `trailingSlash: 'never'`. Changing one without the other causes a redirect
  on every internal link.
- `not_found_handling` serves `404.html`.

Analytics is **Cloudflare Web Analytics via automatic injection** on the zone.
There is deliberately no beacon script in the code; adding one double-counts.
View it at Cloudflare dashboard → Analytics → Web analytics.

## Site structure

| Page | File |
|------|------|
| Home | `src/pages/index.astro` |
| Projects index (tag filter) | `src/pages/projects/index.astro` |
| Project case study | `src/pages/projects/[slug].astro` |
| Work | `src/pages/work.astro` |
| How I work | `src/pages/how-i-work.astro` |
| About | `src/pages/about.astro` |
| 404 | `src/pages/404.astro` |

Shared shell (nav, footer, meta, JSON-LD) is `src/layouts/Base.astro`.
Design tokens and all shared CSS are in `src/styles/global.css`.

## The hero photo

`src/pages/index.astro` checks for `public/images/aj.jpg` at build time. If it
exists the hero becomes two-column (text left, portrait right on desktop,
portrait above the text on phones). If it doesn't, no `<img>` is emitted at
all, so a missing file never ships a broken image.

The card expects a **3:4 portrait**. Current file is 900x1200.

## Adding a project

Drop a markdown file in `src/content/projects/` and it appears automatically.
Schema is enforced in `src/content.config.ts`.

```yaml
---
title: 'Project name'
hook: 'One line, ideally with a number, shown on the card'
summary: 'One or two sentences for the card and meta description.'
tags: ['Finance', 'Data']    # Finance | Product | Data | Ops | AI
featured: true               # show on the home page
order: 4                     # sort position (lower first)
status: 'live'               # live | shipped | in-progress
cover: '/images/covers/x.png'   # optional; 16:9 renders on the card
coverAlt: 'Description of the image'
links:
  - label: 'Visit the site'
    url: 'https://example.com'
---
```

If you add a **new tag**, update three places: the enum in
`src/content.config.ts`, the `lanes` array in `src/pages/index.astro`, and the
`tags` array in `src/pages/projects/index.astro`. Also add a `.tag-<Name>`
colour rule in `global.css`.

## Regenerating images

All under `scripts/`, run with `node scripts/<file>`:

- **`shots.mjs`** — headless Playwright screenshots of the live projects
  (NotTomorrow, the recommendation engine, dunelakesltd.com, and the three R
  Shiny apps). The Shiny apps cold-start on the free tier, hence the long
  waits. Re-run after changing any of those apps.
- **`shots2.mjs`** — the recommendation engine with heroes selected, because
  the default empty state makes a poor cover.
- **`aba-cover.mjs`** — generates the ABA case-study cover: client logos on
  white chips plus the ABA mark. Logos live in `public/images/logos/` and are
  lockups with their own backgrounds, so they cannot be silhouetted to a single
  colour.
- **`make-og.mjs`** — the social-share image (`public/og.png`).

Covers are downscaled to 1600x900 before committing; the raw Dune Lakes
screenshot was 3.3 MB.

## House rules for copy

- **No em dashes anywhere in site copy.**
- Every number must be true and defensible in an interview. Estimates are
  labeled as estimates. Metrics the data can't support get left out.
- Plain, warm, direct voice.
- **Do not claim NotTomorrow is monetized or has paying users.** It has
  subscription billing built; it has no subscribers or revenue.
- Dune Lakes is framed as advisory and build work on a short-term rental
  business. AJ is not an owner and does not run it, and the family connection
  is deliberately not mentioned.
- Client logos are shown only for ABA Consulting clients, labeled "Clients at
  ABA Consulting" so the relationship is not overstated.

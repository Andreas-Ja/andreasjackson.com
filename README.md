# andreasjackson.com

Personal portfolio site for Andreas (AJ) Jackson. Built with [Astro](https://astro.build), deployed on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```

## Adding a project

Drop a markdown file in `src/content/projects/` with this frontmatter and it appears on the site automatically:

```yaml
---
title: 'Project name'
hook: 'One line with a number in it, shown on the card'
summary: 'One or two sentences for the card and meta description.'
tags: ['Finance', 'Data']   # any of Finance / Product / Data / Ops
featured: true               # show on the home page
order: 4                     # sort position
status: 'live'               # live / shipped / in-progress
links:
  - label: 'Visit the site'
    url: 'https://example.com'
cover: '/images/my-project/cover.png'   # optional, file under public/
---
```

Images go under `public/images/<project>/`. Regenerate the social-share image with `node scripts/make-og.mjs`.

## House rules for copy

- No em dashes anywhere in site copy.
- Every number must be true and defensible in an interview.
- Plain, warm, direct voice.

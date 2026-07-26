---
title: 'Overlap-scoring recommendation engine'
hook: 'A custom ranking algorithm over a normalized 38-entity, 33-item dataset, shipped dependency-free'
summary: 'A single-file web app that ranks optimal purchases against any opposing lineup, built on a custom overlap-plus-hard-counter scoring algorithm, a normalized 38-hero / 33-item dataset, and a self-contained REST API asset pipeline.'
tags: ['Product', 'Data']
featured: false
order: 5
status: 'live'
links:
  - label: 'Try the live app'
    url: 'https://andreas-ja.github.io/deadlock-counter-buy/'
  - label: 'View the repo'
    url: 'https://github.com/Andreas-Ja/deadlock-counter-buy'
---

## The problem

Some decisions are high-leverage while the knowledge behind them stays folklore:
real, well understood by experts, and impossible to recall in the ten seconds you
have to act. The case I picked is item selection in Deadlock, a competitive hero
shooter where buying the right defensive items against the enemy lineup is one of
the biggest swings available in a match. That knowledge lives in community guides
and accumulated experience, and nowhere queryable. I turned it into one click:
select the opposing lineup, get a ranked buy list with reasons attached.

## The design decision

The obvious ranking signal is counter-strength: how hard does this item punish
that hero? That is the wrong answer. The best purchase is usually the item that
neutralizes the most enemies at once, so the app scores every item by **overlap**
across the selected team.

Pure overlap has its own failure mode. An item that shuts one hero down almost
entirely can lose to a mediocre item that happens to touch two, so hard counters
get a weighted bonus and their own priority tier. The result mirrors how strong
players actually prioritize, and items that backfire against specific heroes get
an explicit "do not buy" warning instead of being silently ranked low.

## What I built

- **Ranking engine.** Each item is scored as overlap plus hard-counter
  weighting, then split into Priority and Situational tiers with per-hero
  rationale and anti-recommendations.
- **Structured domain dataset.** I compiled a community strategy guide into a
  normalized model of 38 heroes and 33 items, with every counter annotated with
  a one-line reason. Data is fully separated from presentation, so extending it
  is a data edit rather than a code change.
- **API integration and asset pipeline.** Pulled official hero and item
  metadata and artwork from a public REST API, reconciled the naming mismatches
  between the API and the guide, then optimized and committed 71 WebP assets so
  the app ships self-contained with no third-party runtime calls.
- **Product-grade UI.** Responsive down to phone width (you use this mid-match),
  light and dark theming, live hero search, keyboard-accessible controls, and a
  visual identity that fits the game.
- **Frictionless deploy.** A single static `index.html` with no build step,
  hosted on GitHub Pages with push-to-deploy. It loads instantly and needs no
  account.

## Why it's here

It is the smallest complete example of how I work: take knowledge that only
exists as folklore, model it properly, decide what the ranking should actually
optimize for, and ship something a stranger can use without instructions.

## Skills demonstrated

Front-end engineering (semantic HTML, CSS grid, custom-property design tokens,
responsive and themed UI, framework-free JavaScript with DOM rendering and state
management), algorithm design, data modeling and schema design, REST API
integration, data wrangling and normalization, UX and information design,
accessibility, Git, and CI-free continuous deployment.

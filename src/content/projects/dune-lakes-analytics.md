---
title: 'Dune Lakes revenue analytics'
hook: '$122K of real booking revenue, analyzed down to channel fees and an 86% contribution margin'
summary: 'A Python and Excel analytics pipeline built on the real reservation data of a rental business I help run: revenue on the books, channel economics, unit performance, cancellations, and margin.'
tags: ['Finance', 'Data']
featured: true
order: 2
status: 'shipped'
cover: '/images/dune-lakes/revenue_on_books.png'
coverAlt: 'Chart of confirmed Dune Lakes revenue by arrival month'
links:
  - label: 'Read the full report (PDF)'
    url: '/files/Dune_Lakes_2026_Report.pdf'
---

## The problem

Dune Lakes runs on OwnerRez, whose raw booking export is messy: linked $0
"block" rows for multi-cottage bundles, mixed channels with very different fee
structures, and cancellations that may or may not have touched real money. The
business needed a clean answer to basic questions: how much revenue is
actually on the books, which units and channels earn it, and what margin is
left after variable costs.

## What I did

I built a one-command Python pipeline (pandas) that ingests the OwnerRez
Booking Detail export and produces a formatted Excel workbook and charts:

- **Data cleaning:** filtered out the $0 linked block rows so only
  revenue-carrying bookings count, and validated fees against the actual
  `Host Fees` column instead of assuming rates.
- **Revenue on the books:** confirmed gross and net revenue, nights, and ADR
  by arrival month, split into realized and upcoming.
- **Channel economics:** revenue and real fee load by channel. Airbnb carries
  a 15.5% host fee versus 2.8% direct and 2.2% on Vrbo, so every booking
  shifted from Airbnb to direct is worth about 13 points of margin.
- **Unit performance:** the whole-compound "Cottage Trio" listing alone is 52%
  of revenue at a $2,790 ADR. The large-group listings carry the business.
- **Cancellations and margin:** separated real refunds ($7.5K across 2 paid
  cancellations) from pre-payment noise, and built a contribution margin and
  sensitivity view (roughly 86% before fixed costs).

## Honest caveats, on purpose

The analysis only claims what the data supports. True occupancy is
deliberately not reported because the export lacks availability calendars,
and I'd rather omit a metric than fake it. Operating cost estimates are
clearly labeled as estimates.

![Revenue by channel](/images/dune-lakes/revenue_by_channel.png)

![Revenue by listing](/images/dune-lakes/revenue_by_listing.png)

## Skills demonstrated

Financial analysis, revenue analytics, unit economics, channel and margin
analysis, scenario and sensitivity analysis, data cleaning, KPI reporting,
Python (pandas), Excel model build.

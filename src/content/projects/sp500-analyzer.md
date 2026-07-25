---
title: 'S&P 500 return analyzer'
hook: 'Rolling 1 to 30 year returns across 95 years of S&P 500 history, recomputed live'
summary: 'An interactive R Shiny app for exploring the full daily history of the S&P 500: a zoomable price timeline, rolling multi-year total returns, and distribution statistics for any window you pick.'
tags: ['Finance', 'Data']
featured: false
order: 6
status: 'live'
links:
  - label: 'Open the live app'
    url: 'https://andreasjackson.shinyapps.io/sp500/'
  - label: 'View the repo'
    url: 'https://github.com/Andreas-Ja/sp500-analyzer'
---

## The question

The same index looks like a completely different investment depending on the
holding period you choose. A chart of the S&P 500 tells you almost nothing about
that, because it shows one path and hides the distribution around it. I wanted a
tool where you set the window and the holding period, and the return distribution
falls out.

## What it does

Point the controls at any span from 1928 to 2023 and everything recomputes on the
fly.

- **Price timeline.** Daily closes for the selected window, on a linear or
  logarithmic axis. Log scale is the point: it puts 1930s moves and modern ones
  on a comparable footing. Axis tick spacing widens automatically from 1 to 2 to
  5 to 10 years as the window grows, so labels never collide.
- **Rolling multi-year returns.** A bar chart of N-year total returns with N
  adjustable from 1 to 30. Each bar is one overlapping interval, green for gains
  and red for losses, with label density thinning itself as intervals multiply.
  Mean, median, and standard deviation draw as annotated reference lines when
  toggled.
- **Distribution stats.** Mean, median, standard deviation, IQR, min and max, and
  the 10th, 25th, 75th, and 90th percentiles for the returns in view.

## Notes on the build

The app bundles no data. On startup it pulls the `^GSPC` daily series live from
Yahoo Finance through `tidyquant`, so there is nothing to download and nothing to
go stale. That is a deliberate tradeoff: it costs an internet dependency and the
occasional rate limit, and it buys an app that is always current and clones in one
step.

**Stack:** R, Shiny, tidyquant, tidyverse, lubridate, ggplot2, plotly.

## Skills demonstrated

R, Shiny, financial data analysis, rolling-window and total-return calculation,
descriptive statistics, interactive data visualization, API-sourced data
pipelines, UX decisions in analytical tools.

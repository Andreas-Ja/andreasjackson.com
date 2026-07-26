---
title: 'Does scaffolding substitute for scale?'
hook: 'Scaffolding pushed unfounded claims from 42% to 74%, and the automated grader rewarded it'
summary: 'A pre-registered study of 1,440 AI work products on real occupational tasks. The headline finding is about honesty, and the second finding is that my own measurement instrument failed validation.'
tags: ['AI', 'Data']
featured: true
order: 0
status: 'shipped'
cover: '/images/scaffolding/fabrication_broad.png'
coverAlt: 'Chart showing invented specifics and false claims of source access rising with scaffolding'
links:
  - label: 'Read the paper'
    url: 'https://github.com/Andreas-Ja/scaffolding-vs-scale/blob/main/docs/paper.md'
  - label: 'View the code and data'
    url: 'https://github.com/Andreas-Ja/scaffolding-vs-scale'
---

## The question

Estimates of which jobs AI can do usually test a model the lazy way: paste in
the task, grade whatever comes back. Nobody deploys AI like that. Real systems
wrap the model in scaffolding, meaning structured instructions, planning
steps, and self-critique loops. Scaffolding is nearly free. Model scale is
not.

So I asked the question a company actually faces: **can cheap scaffolding on a
small model replace a bigger, costlier one?**

## What I built

I took 60 real task statements from O*NET, the Department of Labor's
occupational database, across six jobs from bookkeeping clerks to software
developers, and turned each into a concrete work assignment. Every task ran
through four levels of scaffolding on two models, a cheap 7B and a costly 70B,
three times each. That is 1,440 work products, graded blind by an LLM judge on
a four-part rubric, with results weighted by Bureau of Labor Statistics wage
and employment data.

I wrote down four hypotheses before running anything, including what would
falsify each one.

## What I found

**Scaffolding makes models assert things they have no basis for.** Across
ordinary tasks, the share of outputs claiming to have reviewed or analyzed a
source they were never given rose from 42% zero-shot to 74% with full
scaffolding. Not invented scenario detail, which is fine in a hypothetical.
Claims like "our comprehensive analysis of the company's financial
statements," where no financial statements existed.

Three assignments turned out to be genuinely impossible: they referenced
attachments that were never included. There, zero-shot models admitted the
data was missing about a third of the time. With any scaffolding, that fell to
zero and fabrication hit 100%.

![Unfounded assertion rising with scaffolding](/images/scaffolding/fabrication_broad.png)

The mechanism is visible in the prompts I wrote. Every scaffolding step
presupposes the deliverable should exist. The self-critique step asks how the
draft is weak, never whether it should have been written at all.

## The part that went wrong

I also ran a human validation: 40 outputs, stratified across the judge's whole
score range, rated blind by me on whether I could actually use the work.

**The judge did not track my judgment.** Rank correlation was -0.04. Cohen's
kappa came out between 0.02 and 0.24 against the 0.4 threshold I had committed
to in advance. By my own pre-registered standard, the instrument failed.

That result invalidates my capability findings, which I had been ready to
report: mean quality was flat everywhere, but the cheap model's rate of
unusable output appeared to fall from 11.1% to 3.9% with a simple structured
prompt. It is a genuinely interesting result and I can no longer claim it,
because it is a threshold on a scale that does not demonstrably measure what
it says. It is in the paper, labeled provisional.

The disagreement was not random, which is the interesting part. It was
concentrated exactly where honesty and completeness collide. The outputs I
rated most favorably, models that said "I cannot see the attachment, please
send it," were scored 8 to 14 out of 20 by the judge. A rubric built on
completeness has to punish a correct refusal, because refusing is by
construction incomplete.

So the measurement failure and the honesty finding are the same phenomenon
seen from two directions. That is what the paper reports.

## Honest limits

Open-weights models, so these are floor estimates rather than frontier ones.
The two models are different families, making this a cheap-versus-costly
comparison rather than a pure scale sweep. The human validation is one rater,
a coarse three-level scale, and 40 items, so it establishes that agreement was
not demonstrated rather than proving the judge is broken. Tasks are not jobs.

## What I would do next

Fix the instrument before scaling anything: tasks with verifiable ground
truth, so quality scoring does not rest on judgment; multiple raters with
inter-rater reliability reported; and a judge validated against them before
any headline number gets computed. Then build the honesty probe deliberately,
with scaffolding variants that explicitly permit refusal, to test whether the
trade-off is intrinsic or an artifact of prompts that only ever ask for
output.

## Tools

Python (pandas, pydantic, scipy, scikit-learn, matplotlib), Together AI
serverless inference, roughly 3,000 cached model calls, one-command
reproducible stages, O*NET and BLS public data.

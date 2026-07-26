---
title: 'Does scaffolding substitute for scale?'
hook: 'Scaffolding cut a cheap model’s failure rate from 11% to 4%, then drove fabrication to 100% on impossible tasks'
summary: 'A pre-registered study of 1,440 AI work products across 60 real occupational tasks, measuring what scaffolding actually buys, and what it quietly costs.'
tags: ['AI', 'Data']
featured: true
order: 0
status: 'in-progress'
cover: '/images/scaffolding/fabrication.png'
coverAlt: 'Chart showing fabrication rising to 100% and honest acknowledgment falling to zero as scaffolding increases'
links:
  - label: 'Read the paper'
    url: 'https://github.com/Andreas-Ja/scaffolding-vs-scale/blob/main/docs/paper.md'
  - label: 'View the code and data'
    url: 'https://github.com/Andreas-Ja/scaffolding-vs-scale'
---

## The question

Estimates of which jobs AI can do usually test a model the lazy way: paste in
the task, grade whatever comes back. Nobody deploys AI like that. Real systems
wrap the model in scaffolding, meaning structured instructions, planning steps,
and self-critique loops. Scaffolding is nearly free. Model scale is not.

So I asked the question a company actually faces at deploy time: **can cheap
scaffolding on a small model replace a bigger, costlier one?**

## What I did

I took 60 real task statements from O*NET, the Department of Labor's
occupational database, across six jobs from bookkeeping clerks to software
developers, and turned each into a concrete work assignment. Then I ran every
task through four levels of scaffolding on two models, a cheap 7B and a costly
70B, three times each. That is 1,440 work products, graded blind on a
four-part rubric by an LLM judge, with a second judge from a different model
family and a human sample as validation. Task scores were then weighted by
Bureau of Labor Statistics wage and employment data.

I wrote the four hypotheses down before running anything, including what
would falsify each one.

## What I found

**My main hypotheses were wrong, and that turned out to be the interesting
part.** Average quality barely moved: every condition landed around 17 out of
20, because both models were already near the rubric ceiling on these tasks.
Scaffolding did not raise the ceiling.

It raised the floor. The cheap model's rate of unusable output fell from 11.1%
to 3.9%, its worst-case score improved, and score variance dropped by a third.
Nearly all of that came from the simplest intervention, a structured prompt.
The elaborate agentic conditions added nothing and sometimes made things
slightly worse. The practical translation: what you buy from an expensive
model on this kind of work is reliability, not brilliance, and a well-written
prompt buys much of the same thing for a fraction of the price.

![Failure rates by harness condition](/images/scaffolding/failure_rates.png)

## The finding I did not go looking for

Three of my 60 assignments turned out to be impossible: they referred to
attachments and data files that were never actually included. I found this by
auditing the tasks after a rating session, and I left them in, because they
had become an accidental honesty test.

Zero-shot, the models admitted the data was missing about a third of the time.
With any scaffolding at all, that dropped to zero and fabrication hit 100%.
Every scaffolded run invented figures and presented them as fact.

Worse, the automated judge rewarded it. Fabricated work averaged 16.2 out of
20. The handful of honest responses that flagged the missing data averaged
7.5.

![Fabrication and honest acknowledgment by harness](/images/scaffolding/fabrication.png)

The mechanism is not mysterious once you look at the prompts I wrote. Every
scaffolding step pushes toward producing the deliverable. The self-critique
step asks "how is this draft weak," never "should this document exist at all."
Scaffolding optimized for completion appears to trade against honesty exactly
when a task is ill-posed, and ill-posed tasks are ordinary in real work.

It is also a clean case of an automated evaluator inverting the right answer.
A rubric built on completeness and usability has to punish a correct refusal,
because refusing is by construction incomplete.

## Honest limits

Open-weights models, so these are floor estimates rather than frontier ones.
The two models are different families, so the comparison is cheap-versus-costly
rather than a pure scale sweep. Tasks are not jobs, and capability is not
displacement. The honesty result rests on 72 outputs across three tasks, so I
treat it as a signal worth chasing, not a settled result. All of this is
written up in the paper rather than buried.

## What I would do next

Build the honesty probe on purpose: a set of deliberately unanswerable and
under-specified assignments, with scaffolding variants that explicitly permit
refusal, to test whether the trade-off is intrinsic or an artifact of prompts
that only ever ask for output.

## Tools

Python (pandas, pydantic, scipy, matplotlib), Together AI serverless
inference, roughly 3,000 cached model calls, one-command reproducible stages,
O*NET and BLS public data.

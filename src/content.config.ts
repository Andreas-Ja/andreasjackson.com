import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    // One line with a number in it, shown on cards. Keep it under ~90 chars.
    hook: z.string(),
    summary: z.string(),
    tags: z.array(z.enum(['Finance', 'Product', 'Data', 'Ops'])),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    status: z.enum(['live', 'shipped', 'in-progress']).default('shipped'),
    links: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .default([]),
    // Path under /public, shown at the top of the case study and on cards.
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
  }),
});

export const collections = { projects };

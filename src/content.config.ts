import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const papers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/papers' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    status: z.enum(['Published', 'Under Review', 'Working Paper', 'Preparing for Submission', 'In Progress']),
    abstract: z.string(),
    tags: z.array(z.string()),
    has_scrollytelling: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { papers };

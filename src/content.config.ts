import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Projects drive the cards on BOTH the work grid and the homepage. They used to
 * be duplicated markup in two files, which had already drifted — two cards
 * carried different descriptions depending on which page you looked at.
 *
 * A project either links to a local case study or straight out to where the work
 * actually lives (a live app, a Figma profile, a GitHub repo). `href` carries
 * both cases; anything starting with http is treated as external and gets
 * target="_blank" automatically.
 */
const projects = defineCollection({
  loader: glob({ pattern: '*.yaml', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** The "Mobile App // iOS & Android" separator-style eyebrow. */
    label: z.string(),
    description: z.string(),
    href: z.string(),
    /** Ascending. Controls order in the work grid and on the homepage. */
    order: z.number(),
    /** Whether this project also appears in the homepage's selected work. */
    onHome: z.boolean().default(true),
    /** Renders wide/large in the grid. */
    featured: z.boolean().default(false),
    image: z.string().optional(),
    imageAlt: z.string().default(''),
    /** CSS aspect-ratio for the image frame, e.g. "939 / 827". */
    aspect: z.string().optional(),
    /** Hide a missing image gracefully instead of showing a broken icon. */
    imageFallback: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };

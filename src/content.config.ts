import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const CATEGORIES = ["patterns", "guides", "resources", "articles"] as const;

const postSchema = z.object({
  title: z.string(),
  pubDate: z.date(),
  description: z.string(),
  summary: z.string().optional(),
  author: z.string(),
  breadcrumbSlug: z.string().optional(), // should match the slug
  image: z
    .object({
      url: z.string(),
      alt: z.string(),
      caption: z.string().optional(),
    })
    .optional(),
  tags: z.array(z.string()).optional(),
  category: z.enum(CATEGORIES).optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  editUrl: z.string().optional(),
  youtube: z
    .object({
      id: z.string(),
      title: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
});

const postsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: postSchema,
});

const astroKitDocs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: postSchema,
});

const content = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/content" }),
  schema: postSchema,
});

export const collections = {
  posts: postsCollection,
  docs: astroKitDocs,
  content: content,
};

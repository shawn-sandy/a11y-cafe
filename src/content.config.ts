import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const CATEGORIES = ["patterns", "guides", "resources", "articles"] as const;

// Shared schema for the markdown/MDX post-style collections.
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

/**
 *
 ---
wcagGuideline:
  - guideline: "perceivable"
    level: "A"
    description: "Example description for perceivable guideline"
    rule:
      id: "rule1"
      title: "Rule 1 Title"
      link: "https://example.com/rule1"
  - guideline: "operable"
    level: "AA"
    description: "Example description for operable guideline"
    rule:
      id: "rule2"
      title: "Rule 2 Title"
      link: "https://example.com/rule2"
---
# Markdown Content Here
***/

const a11yGuidelines = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/a11yGuidelines" }),
  schema: z.object({
    guideline: z
      .enum(["perceivable", "operable", "understandable", "robust"])
      .optional(),
    level: z.enum(["A", "AA", "AAA"]).optional(),
    description: z.string(),
    successCriteria: z
      .object({
        id: z.string(),
        title: z.string(),
        link: z.string(),
      })
      .optional(),
    links: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional(),
  }),
});

const patterns = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/patterns" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().optional(),
    guidelines: z.array(reference("a11yGuidelines")).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  docs: astroKitDocs,
  content: content,
  a11yGuidelines: a11yGuidelines,
  patterns: patterns,
};

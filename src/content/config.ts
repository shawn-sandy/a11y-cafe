import { date } from "astro/zod";
import { defineCollection, reference, z } from "astro:content";
const CATEGORIES = ["patterns", "guides", "resources", "articles"];

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
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
    youtube: z
      .object({
        id: z.string(),
        title: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
      })
      .optional(),
  }),
});

const astroKitDocs = defineCollection({
  ...postsCollection,
});
const content = defineCollection({
  ...postsCollection,
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
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date().optional(),
    guidelines: z.array(reference(a11yGuidelines)).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  docs: astroKitDocs,
  content: content,
  patterns: patterns,
};

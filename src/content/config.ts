import { defineCollection, z } from "astro:content";

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

const patterns = defineCollection({
  ...postsCollection,
  schema: z.object({
    a11yLinks: z
      .array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      )
      .optional(),
    wcagGuideline: z
      .array(
        z.object({
          guideline: z.enum([
            "perceivable",
            "operable",
            "understandable",
            "robust",
          ]),
          level: z.enum(["A", "AA", "AAA"]),
          description: z.string(),
          rule: z.object({
            id: z.string(),
            title: z.string(),
            link: z.string(),
          }),
        })
      )
      .optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  docs: astroKitDocs,
  content: content,
  patterns,
};

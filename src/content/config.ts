import { z, defineCollection } from "astro:content";

const interestsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    type: z.enum(["listening", "playing", "reading", "studying", "watching"]),
    artist: z.string().optional(),
    developer: z.string().optional(),
    author: z.string().optional(),
    genres: z.string().optional(),
    cta: z.object({
      url: z.string().url(),
      text: z.string(),
    }),
  }),
});

const projectsCollection = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    introduction: z.string(),
    cta: z
      .object({
        text: z.string(),
        url: z.string(),
      })
      .optional(),
    projects: z.array(
      z.object({
        slug: z.string(),
        title: z.string(),
        url: z.string().url(),
        description: z.string(),
        longDescription: z.array(z.string()),
        stack: z.array(z.string()),
        startDate: z.string().datetime(),
        endDate: z.string().datetime().optional(),
      })
    ),
  }),
});

const aboutCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    color: z.enum(["blue", "yellow", "green", "purple", "orange", "teal"]),
  }),
});

export const collections = {
  interests: interestsCollection,
  projects: projectsCollection,
  about: aboutCollection,
};

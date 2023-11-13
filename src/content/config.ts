import { z, defineCollection } from "astro:content";

const interestsCollection = defineCollection({
  type: "data", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    type: z.enum(["listening", "playing", "reading", "studying", "watching"]),
    image: z.string(),
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
        image: z.string(),
        description: z.string(),
        longDescription: z.array(z.string()),
        stack: z.array(z.string()),
        startDate: z.string().datetime(),
        endDate: z.string().datetime().optional(),
      })
    ),
  }),
});

export const collections = {
  interests: interestsCollection,
  projects: projectsCollection,
};

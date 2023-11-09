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

export const collections = {
  interests: interestsCollection,
};

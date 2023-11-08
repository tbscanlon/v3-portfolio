import { z, defineCollection } from "astro:content";

const interestsCollection = defineCollection({
  type: "data", // v2.5.0 and later
  schema: z.object({
    title: z.string(),
    type: z.enum(["listening", "playing", "reading", "studying", "watching"]),
    url: z.string().url(),
    artist: z.string().optional(),
    developer: z.string().optional(),
    author: z.string().optional(),
    genres: z.string().optional(),
  }),
});

export const collections = {
  interests: interestsCollection,
};

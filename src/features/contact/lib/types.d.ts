import type { z } from "astro:content";
import { charity, freelance, hire } from "./validators";

export type Hire = z.infer<typeof hire>;
export type Freelance = z.infer<typeof freelance>;
export type Charity = z.infer<typeof charity>;
export type Submission = Hire | Freelance | Charity;

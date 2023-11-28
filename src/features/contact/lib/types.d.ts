import type { z } from "astro:content";
import { hire } from "./validators";

export type Hire = z.infer<typeof hire>;

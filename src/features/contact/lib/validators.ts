import { z } from "astro:content";
import {
  BUDGET_RANGES,
  COMPANY_SIZES,
  FEATURES,
  INDUSTRIES,
  JOB_TYPES,
  LOCATION_TYPES,
  SKILLS,
} from "./formValues";

const validate = (submission: unknown, schema: z.AnyZodObject) => {
  try {
    return !!schema.parse(submission);
  } catch {
    return false;
  }
};

export const hire = z.object({
  type: z.enum(["hire", "freelance", "charity"]),
  contactName: z.string(),
  contactEmail: z.string().email(),
  companyName: z.string().optional(),
  website: z.string().optional(),
  companySize: z.enum(COMPANY_SIZES),
  jobTitle: z.string(),
  jobType: z.enum(JOB_TYPES),
  industry: z.enum(INDUSTRIES),
  location: z.string(),
  locationType: z.enum(LOCATION_TYPES),
  privacy: z.literal(true),
});

export const freelance = z.object({
  type: z.enum(["hire", "freelance", "charity"]),
  contactName: z.string(),
  contactEmail: z.string().email(),
  companyName: z.string().optional(),
  website: z.string().optional(),
  industry: z.enum(INDUSTRIES),
  budget: z.enum(BUDGET_RANGES),
  skills: z.array(z.enum(SKILLS)),
  features: z.array(z.enum(FEATURES)),
  privacy: z.literal(true),
});

export const charity = z.object({
  type: z.enum(["hire", "freelance", "charity"]),
  contactName: z.string(),
  contactEmail: z.string().email(),
  companyName: z.string().optional(),
  website: z.string().optional(),
  skills: z.array(z.enum(SKILLS)),
  features: z.array(z.enum(FEATURES)),
  privacy: z.literal(true),
});

export const validators = {
  hire: (submission: unknown) => validate(submission, hire),
  freelance: (submission: unknown) => validate(submission, freelance),
  charity: (submission: unknown) => validate(submission, charity),
};

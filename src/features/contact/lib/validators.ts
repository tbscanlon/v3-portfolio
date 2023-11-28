import { z } from "astro:content";
import {
  COMPANY_SIZES,
  INDUSTRIES,
  JOB_TYPES,
  LOCATION_TYPES,
} from "./formValues";

const validate = (submission: unknown, schema: z.AnyZodObject) => {
  try {
    return !!schema.parse(submission);
  } catch {
    return false;
  }
};

export const hire = z.object({
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

export const validators = {
  hire: (submission: unknown) => validate(submission, hire),
};

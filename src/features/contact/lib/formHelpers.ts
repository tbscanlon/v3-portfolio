import { z } from "astro:content";

export const COMPANY_SIZES = [
  "1-10 employees",
  "11-50 employees",
  "51-200 employees",
  "201-500 employees",
  "501-1000 employees",
  "1001-5000 employees",
  "5001-10,000 employees",
  "10,001+ employees",
];

export const JOB_TYPES = ["full-time", "part-time", "contract"];
export const LOCATION_TYPES = ["on-site", "hybrid", "remote"];

export const INDUSTRIES = [
  "Aerospace",
  "Automotive",
  "Aviation",
  "Banking, insurance and other financial services",
  "Chemicals",
  "Construction and Housing",
  "Consumer goods",
  "Creative, cultural, tourism and sport",
  "Defence",
  "Digital, technology and computer services",
  "E-commerce",
  "Education",
  "Energy",
  "Food",
  "Health and care",
  "Manufacturing",
  "Media and broadcasting",
  "Professional business services",
  "Retail",
  "Research and innovation",
  "Telecoms",
  "Transport",
  "Other",
];

const validate = (submission: unknown, schema: z.AnyZodObject) => {
  try {
    return !!schema.parse(submission);
  } catch {
    return false;
  }
};

const hire = z.object({
  contactName: z.string(),
  contactEmail: z.string().email(),
  companyName: z.string().optional(),
  website: z.string().optional(),
  companySize: z.enum(COMPANY_SIZES),
  jobType: z.enum(JOB_TYPES),
  industry: z.enum(INDUSTRIES),
  location: z.string(),
  locationType: z.enum(LOCATION_TYPES),
  privacy: z.literal(true),
});

export const validators = {
  hire: (submission: unknown) => validate(submission, hire),
};

export interface Project {
  slug: string;
  title: string;
  url: string;
  description: string;
  longDescription: string[];
  stack: string[];
  startDate: string;
  endDate?: string;
}

export type ProjectCard = Pick<
  Project,
  "title" | "description" | "startDate" | "endDate" | "slug"
>;

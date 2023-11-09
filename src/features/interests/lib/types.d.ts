export type InterestType =
  | "listening"
  | "playing"
  | "reading"
  | "studying"
  | "watching";

export interface Interest {
  type: InterestType;
  url: string;
  title: string;
  artist?: string;
  developer?: string;
  author?: string;
  genres?: string;
}

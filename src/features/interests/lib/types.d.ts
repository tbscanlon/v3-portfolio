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
  image?: string;
}

export type Listening = Pick<
  Interest,
  "type" | "url" | "title" | "image" | "artist"
>;
export type Playing = Pick<
  Interest,
  "type" | "url" | "title" | "image" | "developer"
>;
export type Reading = Pick<
  Interest,
  "type" | "url" | "title" | "image" | "author"
>;
export type Studying = Pick<
  Interest,
  "type" | "url" | "title" | "image" | "author"
>;
export type Watching = Pick<
  Interest,
  "type" | "url" | "title" | "image" | "genres"
>;

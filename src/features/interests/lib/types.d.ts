export type InterestType =
  | "listening"
  | "playing"
  | "reading"
  | "studying"
  | "watching";

export interface Interest {
  type: InterestType;
  title: string;
  artist?: string;
  developer?: string;
  author?: string;
  genres?: string;
  image: string;
  cta: {
    url: string;
    text: string;
  };
}

export type Listening = Pick<
  Interest,
  "type" | "cta" | "title" | "image" | "artist"
>;
export type Playing = Pick<
  Interest,
  "type" | "cta" | "title" | "image" | "developer"
>;
export type Reading = Pick<
  Interest,
  "type" | "cta" | "title" | "image" | "author"
>;
export type Studying = Pick<
  Interest,
  "type" | "cta" | "title" | "image" | "author"
>;
export type Watching = Pick<
  Interest,
  "type" | "cta" | "title" | "image" | "genres"
>;

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
  cta: {
    url: string;
    text: string;
  };
}

export type Listening = Pick<Interest, "type" | "cta" | "title" | "artist">;
export type Playing = Pick<Interest, "type" | "cta" | "title" | "developer">;
export type Reading = Pick<Interest, "type" | "cta" | "title" | "author">;
export type Studying = Pick<Interest, "type" | "cta" | "title" | "author">;
export type Watching = Pick<Interest, "type" | "cta" | "title" | "genres">;

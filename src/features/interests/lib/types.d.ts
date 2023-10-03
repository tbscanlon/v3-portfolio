type InterestType = "listening" | "playing" | "reading" | "studying" | "watching"

interface Interest {
  type: InterestType;
  url: string;
  title: string;
}

export interface Listening extends Interest {
  artist: string;
}

export interface Playing extends Interest {
  developer: string;
}

export interface Reading extends Interest {
  author: string;
}

export interface Studying extends Interest {
  author: string;
}

export interface Watching extends Interest {
  genres: string;
}
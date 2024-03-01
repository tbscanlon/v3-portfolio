export interface Segment {
  question: string[];
  answer?: string;
  options: Option[];
}

export interface Option {
  type: "option";
  text: string;
  next: (() => Segment) | (() => void);
}

export interface Question {
  type: "question";
  text: string;
}

export interface Answer {
  type: "answer";
  text: string;
}

export type Conversation = (Question | Answer | Option[])[];

export interface State {
  isChatOpen: boolean;
  openingElement: string;
  chat: Conversation;
}

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

export function toConversation(segment: Segment): Conversation {
  const questions: Question[] = segment.question.map((q) => ({
    type: "question",
    text: q,
  }));

  return [...questions, segment.options];
}

const freelance: Segment = {
  question: [
    "Excellent, let's chat further!",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      type: "option",
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      type: "option",
      text: "Other options?",
      next: () => back,
    },
  ],
};

const charity: Segment = {
  question: [
    "Great!",
    "I love helping out good causes",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      type: "option",
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      type: "option",
      text: "Other options?",
      next: () => back,
    },
  ],
};

const collaborate: Segment = {
  question: ["Ok, sounds great!", "What sort of project do you have?"],
  options: [
    {
      type: "option",
      text: "Freelance",
      next: () => freelance,
    },
    {
      type: "option",
      text: "Charity",
      next: () => charity,
    },
  ],
};

const work: Segment = {
  question: [
    "Great!",
    "Sounds exciting, let's talk further",
    "I have a quick form you can fill out to tell me more about your opportunity",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      type: "option",
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      type: "option",
      text: "Other options?",
      next: () => back,
    },
  ],
};

const hello: Segment = {
  question: [
    "Hello!",
    "Thanks for taking the time to take a look at my portfolio",
    "I really appreciate it!",
    "Can I help you with anything else?",
  ],
  options: [
    {
      type: "option",
      text: "Other options?",
      next: () => back,
    },
  ],
};

const root: Segment = {
  question: [
    "Hello!",
    "I'm Tom Bot. I'm here to help you with any questions you may have about Tom's work",
    "How can I help you?",
  ],
  options: [
    {
      type: "option",
      text: "We want to work with you",
      next: () => collaborate,
    },
    {
      type: "option",
      text: "We'd like to hire you",
      next: () => work,
    },
    {
      type: "option",
      text: "Just saying hello",
      next: () => hello,
    },
  ],
};

const back: Segment = {
  question: ["Sure, here you go!"],
  options: [...root.options],
};

export const segments = {
  root,
  back,
  freelance,
  charity,
  work,
  hello,
};

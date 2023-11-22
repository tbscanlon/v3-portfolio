export interface Conversation {
  question: string[];
  answer?: string;
  options: Option[];
}

export interface Option {
  text: string;
  next: (() => Conversation) | (() => void);
}

export let root: Conversation;
export let freelance: Conversation;
export let charity: Conversation;
export let collaborate: Conversation;
export let work: Conversation;
export let hello: Conversation;
export let back: Conversation;

freelance = {
  question: [
    "Excellent, let's chat further!",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      text: "Other options?",
      next: () => back,
    },
  ],
};

charity = {
  question: [
    "Great!",
    "I love helping out good causes",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      text: "Other options?",
      next: () => back,
    },
  ],
};

collaborate = {
  question: ["Ok, sounds great!", "What sort of project do you have?"],
  options: [
    {
      text: "Freelance",
      next: () => freelance,
    },
    {
      text: "Charity",
      next: () => charity,
    },
  ],
};

work = {
  question: [
    "Great!",
    "Sounds exciting, let's talk further",
    "I have a quick form you can fill out to tell me more about your opportunity",
    "It shouldn't take more than a minute or two to complete",
  ],
  options: [
    {
      text: "Fill out form",
      next: () => alert("Form goes here"),
    },
    {
      text: "Other options?",
      next: () => back,
    },
  ],
};

hello = {
  question: [
    "Hello!",
    "Thanks for taking the time to take a look at my portfolio",
    "I really appreciate it!",
    "Can I help you with anything else?",
  ],
  options: [
    {
      text: "Other options?",
      next: () => back,
    },
  ],
};

root = {
  question: [
    "Hello!",
    "I'm Tom Bot. I'm here to help you with any questions you may have about Tom's work",
    "How can I help you?",
  ],
  options: [
    {
      text: "We want to work with you",
      next: () => collaborate,
    },
    {
      text: "We'd like to hire you",
      next: () => work,
    },
    {
      text: "Just saying hello",
      next: () => hello,
    },
  ],
};

back = {
  question: ["Sure, here you go!"],
  options: [...root.options],
};

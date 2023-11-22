interface Conversation {
  question: string | string[];
  answer: string[];
}

const root: Conversation = {
  question: [
    "Hello!",
    "I'm Tom Bot. I'm here to help you with any questions you may have about Tom's work",
    "How can I help you?",
  ],
  answer: [
    "We want to work with you",
    "We'd like to hire you",
    "Just saying hello",
  ],
};

const collaborate: Conversation = {
  question: ["Ok, sounds great!", "What sort of project do you have?"],
  answer: ["Freelance", "Charity"],
};

const freelance: Conversation = {
  question: [
    "Excellent, let's chat further!",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  answer: ["Fill out form", "Other options?"],
};

const charity: Conversation = {
  question: [
    "Great!",
    "I love helping out good causes",
    "I have a quick form you can fill out to let me know about your project",
    "It shouldn't take more than a minute or two to complete",
  ],
  answer: ["Fill out form", "Other options?"],
};

const work: Conversation = {
  question: [
    "Great!",
    "Sounds exciting, let's talk further",
    "I have a quick form you can fill out to tell me more about your opportunity",
    "It shouldn't take more than a minute or two to complete",
  ],
  answer: ["Fill out form", "Other options?"],
};

const hello: Conversation = {
  question: [
    "Hello!",
    "Thanks for taking the time to take a look at my portfolio",
    "I really appreciate it!",
    "Can I help you with anything else?",
  ],
  answer: ["Other options?"],
};

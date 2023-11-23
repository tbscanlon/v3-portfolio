import { computed, map } from "nanostores";
import { segments, toConversation } from "./chatTree";
import type { Conversation, Option, Segment } from "./chatTree";

interface State {
  isChatOpen: boolean;
  openingElement: string;
  chat: Conversation;
}

export const store = map<State>({
  isChatOpen: false,
  openingElement: "",
  chat: [],
});

export const selectors = {
  isChatOpen: computed(store, ({ isChatOpen }) => isChatOpen),
  openingElement: computed(store, ({ openingElement }) => openingElement),
  isTyping: computed(
    store,
    ({ chat }) => !Array.isArray(chat[chat.length - 1])
  ),
  chat: computed(store, ({ chat }) => chat),
};

export const actions = {
  open: (from: string) => {
    store.setKey("isChatOpen", true);
    store.setKey("openingElement", from);
  },
  close: () => store.setKey("isChatOpen", false),
  start: () => simulateTyping(segments.root),
  answer: (answer: string) => handleAnswer(answer),
  reset: () => store.setKey("chat", []),
};

async function simulateTyping(segment: Segment) {
  function simulateTypingTimer(text: string) {
    const TYPING_TIME_PER_WORD = 150;
    const wordCount = text.split(" ").length;
    return wordCount * TYPING_TIME_PER_WORD;
  }

  async function throttle(delay: number, func: () => any) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    }).then(func);
  }

  let delay = 250;

  toConversation(segment).forEach(async (entry) => {
    if (!Array.isArray(entry)) {
      delay += simulateTypingTimer(entry.text);
    }

    await throttle(delay, () => {
      const current = selectors.chat.get();
      store.setKey("chat", [...current, entry]);
    });
  });
}

export const handleAnswer = async (answer: string) => {
  const current = selectors.chat.get();
  const options = current[current.length - 1] as Option[];
  const selected = options.find((entry) => entry.text === answer) as Option;

  const nextSegment = selected.next();

  if (nextSegment) {
    store.setKey("chat", [
      ...current.filter((entry) => !Array.isArray(entry)),
      { type: "answer", text: answer },
    ]);

    await simulateTyping(nextSegment);
  }
};

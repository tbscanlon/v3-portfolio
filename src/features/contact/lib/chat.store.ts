import { atom } from "nanostores";
import { segments, toConversation } from "./chatTree";
import type { Conversation, Option, Segment } from "./chatTree";

export const isTyping = atom<boolean>(true);
export const isChatOpen = atom<boolean>(false);
export const openingElement = atom<string>("");
export const chat = atom<Conversation>([]);

export const openChat = () => isChatOpen.set(true);

export const setOpeningElement = (selector: string) =>
  openingElement.set(selector);

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
      const current = chat.get();
      chat.set([...current, entry]);
    });
  });
}

export const startChat = async () => {
  chat.listen((entries) => {
    const last = entries[entries.length - 1];

    if (Array.isArray(last)) {
      isTyping.set(false);
    } else {
      isTyping.set(true);
    }
  });

  simulateTyping(segments.root);
};

export const answer = async (answer: string) => {
  const current = chat.get();
  const options = current[current.length - 1] as Option[];
  const selected = options.find((entry) => entry.text === answer) as Option;

  const nextSegment = selected.next();

  if (nextSegment) {
    chat.set([
      ...current.filter((entry) => !Array.isArray(entry)),
      { type: "answer", text: answer },
    ]);

    await simulateTyping(nextSegment);
  }
};

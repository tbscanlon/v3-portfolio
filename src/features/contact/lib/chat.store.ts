import { atom } from "nanostores";
import { segments, toConversation } from "./chatTree";
import type { Conversation, Option } from "./chatTree";

export const isChatOpen = atom<boolean>(false);
export const openingElement = atom<string>("");
export const chat = atom<Conversation>([]);

export const openChat = () => isChatOpen.set(true);
export const startChat = () => chat.set(toConversation(segments.root));

export const setOpeningElement = (selector: string) =>
  openingElement.set(selector);

async function throttle(delay: number, func: () => any) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(func);
}

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

    console.log(toConversation(nextSegment));

    toConversation(nextSegment).forEach(async (entry, index) => {
      await throttle(index * 1000, () => {
        const current = chat.get();
        chat.set([...current, entry]);
      });
    });
  }
};

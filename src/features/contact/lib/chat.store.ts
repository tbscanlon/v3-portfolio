import { atom } from "nanostores";
import * as conversations from "./chatTree";
import type { Conversation } from "./chatTree";

export const isChatOpen = atom<boolean>(false);
export const openingElement = atom<string>("");
export const chat = atom<Conversation[]>([conversations.root]);

export const openChat = () => isChatOpen.set(true);
export const setOpeningElement = (selector: string) =>
  openingElement.set(selector);

export const answer = (answer: string) => {
  const current = chat.get();
  const last = current[current.length - 1];
  const selected = last.options.find((option) => option.text === answer);

  if (selected) {
    const step = selected.next();

    if (step) {
      const next: Conversation = { ...step };

      const modified = current.filter(
        (segment, index) => index !== current.length - 1
      );

      return chat.set([...modified, { ...last, answer }, next]);
    }
  }
};

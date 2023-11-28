import { computed, map } from "nanostores";
import { segments } from "./chatTree";
import { throttle, toConversation, simulateTypingTimer } from "./helpers";
import type { State, Option, Segment } from "./types";

/**
 * Simulates a typed response to a question in the chat experience
 * via throttling. This creates an effect like the chatbot is "typing"
 * responses to visitor queries.
 *
 * @param segment The conversation segment to "type" out.
 */
async function simulateTyping(segment: Segment) {
  let delay = 0;

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

/**
 * Handles the logic for grabbing a visitor's selection (answer)
 * in the chat experience and returning the correct set of responses.
 * These responses are directly pushed to chat state.
 *
 * @param answer The response chosen by the visitor, as a string.
 */
const handleAnswer = async (answer: string) => {
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

export const store = map<State>({
  isChatOpen: false,
  openingElement: "",
  chat: [],
});

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

export const selectors = {
  isChatOpen: computed(store, ({ isChatOpen }) => isChatOpen),
  openingElement: computed(store, ({ openingElement }) => openingElement),
  isTyping: computed(
    store,
    ({ chat }) => !Array.isArray(chat[chat.length - 1])
  ),
  chat: computed(store, ({ chat }) => chat),
};

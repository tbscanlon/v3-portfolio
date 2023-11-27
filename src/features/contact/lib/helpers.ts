import type { Segment, Question, Conversation } from "./types";

/**
 * Calculates a delay to convincingly simulate typing for a
 * text string.
 *
 * @param text The string to simulate typing for.
 * @returns The calculated delay to apply to the throttle
 * in order to create a convincing illusion of typing.
 */
export function simulateTypingTimer(text: string) {
  const TYPING_TIME_PER_LETTER = 20; // ms
  const TYPING_BUFFER_TIME = 500; // ms

  const letterCount = text.length;

  return letterCount * TYPING_TIME_PER_LETTER + TYPING_BUFFER_TIME;
}

/**
 * Promise wrapper for `setTimeout()`.
 *
 * @param delay The delay for `setTimeout()`.
 * @param func The function to call when setTimeout completes.
 * @returns A promise that resolves after the `setTimeout` delay.
 */
export async function throttle<T>(delay: number, func: () => T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  }).then(func);
}

/**
 * Converts a conversation segment into an array that can be used easily within
 * the UI.
 *
 * @param segment A conversation segment, as defined in `chatTree.ts`.
 * @returns The segment, converted into a Conversation data structure for use
 * in the UI.
 */
export function toConversation(segment: Segment): Conversation {
  const questions: Question[] = segment.question.map((q) => ({
    type: "question",
    text: q,
  }));

  return [...questions, segment.options];
}

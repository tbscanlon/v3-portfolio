import { atom } from "nanostores";

export const isChatOpen = atom<boolean>(false);

export const openChat = () => isChatOpen.set(true);

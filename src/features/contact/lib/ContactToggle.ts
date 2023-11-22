import { openChat } from "../lib/chat.store";

export class ContactToggle extends HTMLElement {
  private toggle: HTMLButtonElement | null;

  constructor() {
    super();

    this.toggle = this.querySelector("button");
    this.toggle?.addEventListener("click", openChat);
  }
}

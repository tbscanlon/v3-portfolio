import { actions } from "../lib/chat.store";

export class ContactToggle extends HTMLElement {
  private toggle: HTMLButtonElement | null;
  private selector: string;

  constructor(selector: string) {
    super();

    this.selector = selector;
    this.toggle = this.querySelector("button");
    this.toggle?.addEventListener("click", () => this.open());
  }

  private open() {
    actions.open(this.selector);
  }
}

import { actions } from "./chat.store";

export class ContactToggle extends HTMLElement {
  private toggle: HTMLButtonElement | null;
  private mobileNav: HTMLDialogElement | null;
  private selector: string;

  constructor(selector: string) {
    super();

    this.mobileNav = document.querySelector("#mobile-nav-container");
    this.selector = selector;
    this.toggle = this.querySelector("button");
    this.toggle?.addEventListener("click", () => this.open());
  }

  private open() {
    this.mobileNav?.close();
    actions.open(this.selector);
  }
}

<script lang="ts">
  import { fade } from "svelte/transition";
  import { actions, selectors } from "../lib/chat.store";
  import avatar from "../images/avatar.svg";
  import Conversation from "./Conversation.svelte";

  const { isChatOpen, openingElement } = selectors;

  /**
   * Locks body scroll on small screens when chat is open.
   */
  function lockScrolling(node: HTMLDialogElement) {
    const body = document.querySelector("body");
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      body?.classList.add("overflow-hidden");
    }

    return {
      destroy() {
        if (isMobile) {
          body?.classList.remove("overflow-hidden");
        }
      },
    };
  }

  /**
   * Handles moving keyboard focus between the chat experience
   * and the button which triggered it.
   */
  function focus(node: HTMLDialogElement) {
    node.focus();

    return {
      // When closed, return focus to the button that
      // was clicked to open the contact experience.
      destroy() {
        const el = document.querySelector(
          openingElement.get()
        ) as HTMLButtonElement;

        if (el) {
          el.focus();
        }
      },
    };
  }
</script>

{#if $isChatOpen}
  <dialog
    use:focus
    use:lockScrolling
    transition:fade={{ duration: 200 }}
    class="fixed flex flex-col z-50 bg-grey-1 md:border border-grey-11 shadow-highlight md:rounded-lg bottom-0 md:bottom-8 md:right-8 left-auto top-auto w-full md:max-w-md text-grey-1 h-[100vh] md:h-[80vh] md:max-h-[600px]"
  >
    <div class="bg-green-light flex items-center p-4 md:rounded-t-lg">
      <img
        src={avatar.src}
        class="h-12 w-12 border-2 border-grey-1 rounded-full p-0.5"
        alt=""
        loading="lazy"
      />
      <div class="ml-2">
        <span class="block text-base font-semibold leading-none mb-1"
          >Tom Bot v1.0</span
        >
        <span class="block text-sm leading-none">Ask me a question</span>
      </div>
      <button
        class="rounded-full p-1 hover:bg-green-dark focus:bg-green-dark duration-300 shrink-0 ml-auto flex items-center justify-center"
        on:click={() => actions.close()}
      >
        <span class="sr-only">Close chat</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
    <Conversation />
  </dialog>
{/if}

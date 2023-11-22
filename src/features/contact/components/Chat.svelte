<script lang="ts">
  import { onMount } from "svelte";
  import { isChatOpen } from "../lib/chat.store";

  let dialog: HTMLDialogElement;

  onMount(() => {
    isChatOpen.subscribe((status) => {
      if (status) {
        dialog.show();
      } else {
        dialog.close();
      }
    });
  });
</script>

<dialog bind:this={dialog} class="fixed z-50 bg-red-light bottom-0">
  <button
    class="rounded-full p-1 hover:bg-grey-4 focus:bg-grey-4 duration-300"
    on:click={() => isChatOpen.set(false)}
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
  hello lol
</dialog>

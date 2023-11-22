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

<dialog bind:this={dialog} class="bg-red-light bottom-0">hello lol</dialog>

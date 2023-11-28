<script lang="ts">
  import { afterUpdate } from "svelte";

  export let isVisible: boolean;
  let dialog: HTMLDialogElement;

  afterUpdate(() => {
    if (isVisible) {
      const body = document.querySelector("body") as HTMLBodyElement;
      body.classList.add("overflow-hidden");

      dialog.showModal();
    }
  });
</script>

{#if isVisible}
  <dialog bind:this={dialog}>Error</dialog>
{/if}

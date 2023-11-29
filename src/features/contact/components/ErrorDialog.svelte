<script lang="ts">
  import { afterUpdate } from "svelte";
  import { fade } from "svelte/transition";

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
  <dialog
    bind:this={dialog}
    transition:fade={{ duration: 200 }}
    class="mx-4 md:mx-auto backdrop:bg-grey-1/75 bg-grey-1 rounded-lg shadow-highlight w-full md:max-w-prose border border-grey-11"
  >
    <div class="p-4 bg-orange-light text-grey-1 flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>

      <h2 class="text-xl md:text-2xl font-medium">There's been a problem</h2>
    </div>
    <div class="px-4 py-8 text-grey-11 space-y-4 md:space-y-6 leading-relaxed">
      <p>Sorry, but there seems to be a problem with the form.</p>
      <p>
        If you would like, you can contact me directly via email at <a
          class="inline-block underline underline-offset-4 decoration-2 duration-300 hover:decoration-4 focus:decoration-4 py-2 md:py-0 decoration-orange-light hover:text-orange-light focus:text-orange-light"
          href={`mailto:${import.meta.env.PUBLIC_CONTACT_EMAIL}`}
          >{import.meta.env.PUBLIC_CONTACT_EMAIL}</a
        >. I'll respond as soon as I can.
      </p>
      <p>Thanks again for your interest in me and my work!</p>
      <a
        href="/"
        class="inline-flex border rounded-lg p-3 lg:px-6 duration-300 justify-center items-center border-grey-2 text-grey-2 bg-orange-light hover:bg-orange focus:bg-orange shadow-highlight cursor-pointer"
        >Back to homepage</a
      >
    </div>
  </dialog>
{/if}

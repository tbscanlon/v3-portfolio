<script lang="ts">
  import { afterUpdate, onMount } from "svelte";
  import { chat, startChat, answer } from "../lib/chat.store";

  let wrapper: HTMLDivElement;

  onMount(() => {
    startChat();
  });

  afterUpdate(() => {
    wrapper.scrollTo({
      top: wrapper.scrollHeight,
    });
  });
</script>

<div
  class="h-full px-4 pt-4 text-base flex flex-col overflow-y-scroll"
  bind:this={wrapper}
>
  {#each $chat as entry}
    <div class={`segment ${Array.isArray(entry) ? "option" : entry.type}`}>
      {#if Array.isArray(entry)}
        {#each entry as option}
          <button
            class="hover:bg-grey-3 focus:bg-grey-3"
            on:click={() => answer(option.text)}>{option.text}</button
          >
        {/each}
      {:else}
        <span class={entry.type}>{entry.text}</span>
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  .segment {
    @apply mb-4 flex;
  }

  .segment > span,
  .segment > button {
    @apply py-2 px-4 max-w-[75%] rounded-md w-auto leading-relaxed;
  }

  .segment.answer > span {
    @apply bg-green-light;
  }

  .segment.question > span {
    @apply text-grey-11 bg-grey-3;
  }

  .segment.option,
  .segment.answer {
    @apply flex-row-reverse;
  }

  .segment.option > button {
    @apply text-grey-11 border-green-light border-2 duration-300;
  }
</style>

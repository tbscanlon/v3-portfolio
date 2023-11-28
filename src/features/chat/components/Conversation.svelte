<script lang="ts">
  import { afterUpdate, onDestroy, onMount } from "svelte";
  import { actions, selectors } from "../lib/chat.store";

  let { chat, isTyping } = selectors;
  let wrapper: HTMLDivElement;

  onMount(() => {
    actions.start();
  });

  onDestroy(() => {
    actions.reset();
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
            on:click={() => actions.answer(option.text)}>{option.text}</button
          >
        {/each}
      {:else}
        <span class={entry.type}>{entry.text}</span>
      {/if}
    </div>
  {/each}
</div>
{#if $isTyping}
  <p class="text-grey-9 text-sm px-4 pb-2 md:animate-pulse">
    Tom Bot v1.0 is typing...
  </p>
{/if}

<style lang="postcss">
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .segment {
    @apply mb-4 flex;
    animation: fadeIn 300ms;
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

  .segment.option {
    @apply flex-col items-end space-y-4;
  }

  .segment.answer {
    @apply flex-row-reverse;
  }

  .segment.option > button {
    @apply text-grey-11 border-green-light border-2 duration-300;
  }
</style>

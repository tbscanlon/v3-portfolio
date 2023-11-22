<script lang="ts">
  import { afterUpdate } from "svelte";
  import { chat, answer } from "../lib/chat.store";

  let wrapper: HTMLDivElement;

  afterUpdate(() => {
    wrapper.scrollTo({
      top: wrapper.scrollHeight,
    });
  });
</script>

<div
  class="h-full px-4 pt-4 text-base flex flex-col overflow-scroll"
  bind:this={wrapper}
>
  {#each $chat as segment}
    {#each segment.question as question}
      <div class="segment">
        <span class="question">{question}</span>
      </div>
    {/each}
    {#if segment.answer}
      <div class="segment flex-row-reverse">
        <span class="answer">{segment.answer}</span>
      </div>
    {:else}
      {#each segment.options as option}
        <div class="segment options">
          <button
            class="option hover:bg-grey-3 focus:bg-grey-3"
            on:click={() => answer(option.text)}>{option.text}</button
          >
        </div>
      {/each}
    {/if}
  {/each}
</div>

<style lang="postcss">
  .segment {
    @apply mb-4 flex;
  }

  .segment.options {
    @apply flex-row-reverse;
  }

  .segment > span,
  .segment > button {
    @apply py-2 px-4 max-w-[75%] rounded-md w-auto leading-relaxed;
  }

  .answer {
    @apply bg-green-light;
  }

  .question {
    @apply text-grey-11 bg-grey-3;
  }

  .option {
    @apply text-grey-11 border-green-light border-2 duration-300;
  }
</style>

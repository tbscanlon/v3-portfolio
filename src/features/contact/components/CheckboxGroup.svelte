<script lang="ts">
  import { writable } from "svelte/store";
  import { afterUpdate } from "svelte";

  export let label: string;
  export let name: string;
  export let group: unknown;
  export let options: readonly string[];

  const selected = writable<Record<string, boolean>>(
    options.reduce((prev, cur) => ({ ...prev, [cur]: false }), {})
  );

  afterUpdate(() => {
    group = Object.keys($selected).filter((option) => $selected[option]);
  });
</script>

<div>
  <span class="text-base mb-1"
    >{label}
    <span class="text-base italic">(select all that apply)</span>
  </span>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4">
    {#each options as option}
      <label class="py-2 md:py-0 flex items-center">
        <input
          name={`${name}-${option}`}
          type="checkbox"
          class="w-4 h-4 accent-green-light"
          bind:checked={$selected[option]}
        />
        <span class="text-base ml-2">{option}</span>
      </label>
    {/each}
  </div>
</div>

<style>
  :root {
    color-scheme: dark;
  }
</style>

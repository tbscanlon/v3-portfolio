<script lang="ts">
  export let label: string;
  export let group: unknown;
  export let name: string;
  export let options: readonly string[];
</script>

<div>
  <span class="text-base mb-1">{label}</span>
  <div class="flex justify-between mt-4 accent-green-light">
    {#each options as option}
      <label class="py-2 md:py-0">
        <input
          class="w-4 h-4"
          type="radio"
          bind:group
          value={option}
          name={`${name}-${option}`}
        />
        {option}
      </label>
    {/each}
  </div>
</div>

<style>
  :root {
    color-scheme: dark;
  }
</style>

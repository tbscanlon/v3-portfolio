<script lang="ts">
  export let name: string;
  export let value: string;
  export let label: string;
  export let options: readonly string[];
</script>

<label class="flex flex-col">
  <span class="text-base mb-1">{label}</span>
  <select
    class="bg-grey-1 hover:bg-grey-3 focus:bg-grey-3 text-xl py-2 pl-3 rounded-t-lg border-b-2 border-grey-11 duration-300"
    {name}
    bind:value
  >
    {#each options as option}
      <option value={option}>{option}</option>
    {/each}
  </select>
</label>

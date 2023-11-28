<script lang="ts">
  export let type = "text";
  export let value = "";
  export let label = "";
  export let required = false;
  export let name = "";
  export let hint = "";

  const handleInput = (
    e: Event & { currentTarget: EventTarget & HTMLInputElement }
  ) => {
    value = e.currentTarget.value;
  };
</script>

<label class="flex flex-col"
  ><span class="text-base mb-1"
    >{label}
    {#if hint}
      <span class="text-base italic">({hint})</span>
    {/if}
    {#if !required}
      <span class="text-base italic">(optional)</span>
    {/if}
  </span>
  <input
    class="bg-grey-1 hover:bg-grey-3 focus:bg-grey-3 text-xl py-2 pl-3 rounded-t-lg border-b-2 border-grey-11 duration-300"
    {type}
    {required}
    {name}
    on:input={handleInput}
  />
</label>

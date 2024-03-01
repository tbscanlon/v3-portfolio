<script lang="ts">
  export let checked: boolean;
  export let name: string;
  export let label: string;
</script>

<label class="py-2 md:py-0">
  <input
    {name}
    type="checkbox"
    class="w-4 h-4 accent-green-light"
    bind:checked
  />
  <span class="text-base ml-1">{label}</span>
</label>

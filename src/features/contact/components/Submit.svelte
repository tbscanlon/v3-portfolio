<script lang="ts">
  export let disabled: boolean;
  export let label: string;
</script>

<input
  {disabled}
  type="submit"
  value={label}
  class="border rounded-lg p-3 xl:p-4 lg:px-6 xl:px-8 duration-300 border-grey-2 text-grey-2 bg-green-light enabled:hover:bg-green enabled:focus:bg-green shadow-highlight cursor-pointer disabled:cursor-not-allowed"
/>

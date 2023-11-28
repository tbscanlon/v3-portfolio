<script lang="ts">
  export let legend: string;
</script>

<fieldset class="grid gap-12">
  <legend class="text-xl md:text-2xl font-medium mb-8">{legend}</legend>
  <slot />
</fieldset>

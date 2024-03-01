<script lang="ts">
  import Checkbox from "./Checkbox.svelte";

  export let checked: boolean;
</script>

<div class="text-base italic space-y-4 leading-relaxed">
  <p>
    I take your privacy very seriously. Any data you share with me here is used
    only for evaluating the opportunity you have shared with me.
  </p>
  <p>
    I do not retain this data for any longer than it takes to respond to you, up
    to a maximum of 14 days. I also will not share any data you send to me with
    anyone else under any circumstances.
  </p>
  <p>
    All data you send to me via this form is processed within the UK and EU.
  </p>
</div>
<Checkbox
  name="privacy"
  label="I agree to be contacted about this opportunity"
  bind:checked
/>

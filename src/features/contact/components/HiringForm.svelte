<script lang="ts">
  import { writable } from "svelte/store";
  import { validators } from "../lib/validators";
  import {
    COMPANY_SIZES,
    JOB_TYPES,
    LOCATION_TYPES,
    INDUSTRIES,
  } from "../lib/formValues";
  import SuccessDialog from "./SuccessDialog.svelte";
  import ErrorDialog from "./ErrorDialog.svelte";
  import { submit } from "../lib/submit";

  async function handleSubmit() {
    await submit({
      validator: validators.hire,
      content: $content,
      onSubmit: () => status.set("loading"),
      onSuccess: () => status.set("success"),
      onError: () => status.set("error"),
    });
  }

  const status = writable<"waiting" | "loading" | "success" | "error">(
    "waiting"
  );

  const content = writable({
    contactName: "",
    contactEmail: "",
    companyName: "",
    website: "",
    companySize: "",
    jobTitle: "",
    jobType: "",
    industry: "",
    location: "",
    locationType: "",
    privacy: false,
  });
</script>

<SuccessDialog isVisible={$status === "success"} />
<ErrorDialog isVisible={$status === "error"} />

<form on:submit|preventDefault={handleSubmit}>
  <h2 class="text-2xl md:text-4xl font-medium mb-4">Get in touch with me</h2>
  <p>
    Thanks for thinking of me for your hiring opportunity! Please fill out this
    quick form to let me know about your opportunity.
  </p>
  <fieldset>
    <legend>About you</legend>
    <label
      >Your name
      <input
        type="text"
        name="contactName"
        required
        bind:value={$content.contactName}
      />
    </label>
    <label
      >Your email address
      <input
        type="email"
        name="contactEmail"
        required
        bind:value={$content.contactEmail}
      />
    </label>
  </fieldset>
  <fieldset>
    <legend>About the opportunity</legend>
    <label
      >Company name (optional)
      <input type="text" name="companyName" bind:value={$content.companyName} />
    </label>
    <label>
      Company website (optional)
      <input
        type="text"
        name="website"
        required
        bind:value={$content.website}
      />
    </label>
    <label>
      How many people work at the company?
      <select bind:value={$content.companySize} name="companySize">
        {#each COMPANY_SIZES as size}
          <option value={size}>{size}</option>
        {/each}
      </select>
    </label>
    <label
      >What is the job title for this opportunity? (e.g. Front-end Web
      Developer)
      <input
        type="text"
        name="jobTitle"
        required
        bind:value={$content.jobTitle}
      />
    </label>
    <h3>Work type</h3>
    {#each JOB_TYPES as job}
      <label>
        <input
          type="radio"
          bind:group={$content.jobType}
          value={job}
          name={`jobType-${job}`}
        />
        {job}
      </label>
    {/each}
    <label>
      Which of the following sectors best describes the industry the company is
      within?
      <select bind:value={$content.industry} name="industry">
        {#each INDUSTRIES as industry}
          <option value={industry}>{industry}</option>
        {/each}
      </select>
    </label>
    <label>
      Where is the company located? (just the name of the city is enough)
      <input
        type="text"
        name="location"
        required
        bind:value={$content.location}
      />
    </label>
    <h3>
      Which of the following ways of working best describes the opportunity?
    </h3>
    {#each LOCATION_TYPES as way}
      <label>
        <input
          type="radio"
          bind:group={$content.locationType}
          value={way}
          name={`locationType-${way}`}
        />
        {way}
      </label>
    {/each}
  </fieldset>
  <fieldset>
    <legend>Privacy Notice</legend>
    <p>I care a lot about your privacy</p>
    <label>
      I agree to be contacted by Tom about this opportunity
      <input type="checkbox" bind:checked={$content.privacy} />
    </label>
  </fieldset>
  <input type="submit" value="Get in touch" />
</form>

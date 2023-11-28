<script lang="ts">
  import { writable } from "svelte/store";
  import { validators } from "../lib/validators";
  import {
    COMPANY_SIZES,
    JOB_TYPES,
    LOCATION_TYPES,
    INDUSTRIES,
  } from "../lib/formValues";
  import SuccessDialog from "../components/SuccessDialog.svelte";
  import ErrorDialog from "../components/ErrorDialog.svelte";
  import { submit } from "../lib/submit";
  import Input from "../components/Input.svelte";
  import Select from "../components/Select.svelte";
  import Radio from "../components/Radio.svelte";
  import Privacy from "../components/Privacy.svelte";
  import Submit from "../components/Submit.svelte";
  import Fieldset from "../components/Fieldset.svelte";

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

<form on:submit|preventDefault={handleSubmit} class="space-y-16">
  <header>
    <h2 class="text-2xl md:text-4xl font-medium mb-4">Get in touch with me</h2>
    <p>
      Thanks for thinking of me for your hiring opportunity! Please fill out
      this quick form to let me know about your opportunity.
    </p>
  </header>

  <Fieldset legend="About you">
    <Input
      type="text"
      name="contactName"
      label="Your name"
      required
      bind:value={$content.contactName}
    />
    <Input
      type="email"
      name="contactEmail"
      label="Your email address"
      required
      bind:value={$content.contactEmail}
    />
  </Fieldset>

  <Fieldset legend="About the opportunity">
    <Input
      type="text"
      name="companyName"
      label="Company name"
      bind:value={$content.companyName}
    />
    <Select
      name="companySize"
      label="How many people work at the company?"
      options={COMPANY_SIZES}
      bind:value={$content.companySize}
    />
    <Input
      type="text"
      name="jobTitle"
      label="What is the job title for this opportunity?"
      required
      bind:value={$content.jobTitle}
    />
    <Radio
      label="What type of role best describes this opportunity?"
      name="jobType"
      options={JOB_TYPES}
      bind:group={$content.jobType}
    />
    <Select
      name="industry"
      label="Which of the following sectors best describes the industry the company is
    within?"
      options={INDUSTRIES}
      bind:value={$content.industry}
    />
    <Input
      type="text"
      name="location"
      label="Where is the company located?"
      hint="just the name of the city is enough"
      required
      bind:value={$content.location}
    />
    <Radio
      label="Which of the following ways of working best describes the opportunity?"
      name="locationType"
      options={LOCATION_TYPES}
      bind:group={$content.locationType}
    />
  </Fieldset>

  <Fieldset legend="Privacy notice">
    <Privacy bind:checked={$content.privacy} />
  </Fieldset>

  <Submit label="Get in touch" disabled={!validators.hire($content)} />
</form>

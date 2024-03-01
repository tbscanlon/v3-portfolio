<script lang="ts">
  import { writable } from "svelte/store";
  import { validators } from "../lib/validators";
  import {
    BUDGET_RANGES,
    FEATURES,
    INDUSTRIES,
    SKILLS,
  } from "../lib/formValues";
  import SuccessDialog from "../components/SuccessDialog.svelte";
  import ErrorDialog from "../components/ErrorDialog.svelte";
  import { submit } from "../lib/submit";
  import Input from "../components/Input.svelte";
  import Select from "../components/Select.svelte";
  import Privacy from "../components/Privacy.svelte";
  import Submit from "../components/Submit.svelte";
  import Fieldset from "../components/Fieldset.svelte";
  import CheckboxGroup from "../components/CheckboxGroup.svelte";

  async function handleSubmit() {
    await submit({
      validator: validators.freelance,
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
    type: "freelance",
    contactName: "",
    contactEmail: "",
    companyName: "",
    website: "",
    industry: "",
    budget: "",
    skills: [],
    features: [],
    privacy: false,
  });
</script>

<SuccessDialog isVisible={$status === "success"} />
<ErrorDialog isVisible={$status === "error"} />

<form on:submit|preventDefault={handleSubmit} class="space-y-16">
  <header>
    <h2 class="text-2xl md:text-4xl font-medium mb-4">Get in touch with me</h2>
    <p>
      Thanks for thinking of me for your freelance opportunity! Please fill out
      this quick form to let me know about your opportunity, and I'll respond as
      soon as I can.
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
      label="Company or project name"
      bind:value={$content.companyName}
    />
    <Input
      type="text"
      name="companyWebsite"
      label="Company or project website"
      bind:value={$content.website}
    />
    <Select
      name="industry"
      label="Which of the following sectors best describes the industry your project falls
    within?"
      options={INDUSTRIES}
      bind:value={$content.industry}
    />
    <Select
      name="budget"
      label="What is the approximate budget range for this project?"
      options={BUDGET_RANGES}
      bind:value={$content.budget}
    />
    <CheckboxGroup
      name="skills"
      label="Which of the following services are you interested in?"
      options={SKILLS}
      bind:group={$content.skills}
    />
    <CheckboxGroup
      name="skills"
      label="Which of the following features would you want within your project?"
      options={FEATURES}
      bind:group={$content.features}
    />
  </Fieldset>

  <Fieldset legend="Privacy notice">
    <Privacy bind:checked={$content.privacy} />
  </Fieldset>

  <Submit label="Get in touch" disabled={!validators.freelance($content)} />
</form>

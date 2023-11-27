<script lang="ts">
  import { writable } from "svelte/store";

  function validate() {
    console.log("validation goes here");
  }

  const jobTypes = ["full-time", "part-time", "contract"];
  const locationTypes = ["on-site", "hybrid", "remote"];

  const industries = [
    "Aerospace",
    "Automotive",
    "Aviation",
    "Banking, insurance and other financial services",
    "Chemicals",
    "Construction and Housing",
    "Consumer goods",
    "Creative, cultural, tourism and sport",
    "Defence",
    "Digital, technology and computer services",
    "E-commerce",
    "Education",
    "Energy",
    "Food",
    "Health and care",
    "Manufacturing",
    "Media and broadcasting",
    "Professional business services",
    "Retail",
    "Research and innovation",
    "Telecoms",
    "Transport",
    "Other",
  ];

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1001-5000 employees",
    "5001-10,000 employees",
    "10,001+ employees",
  ];

  const content = writable({
    contactName: "",
    contactEmail: "",
    companyName: "",
    website: "",
    companySize: "",
    jobType: "",
    industry: "",
    location: "",
    locationType: "",
    privacy: false,
  });
</script>

<form on:submit|preventDefault={validate}>
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
        {#each companySizes as size}
          <option value={size}>{size}</option>
        {/each}
      </select>
    </label>
    <h3>Work type</h3>
    {#each jobTypes as job}
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
        {#each industries as industry}
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
    {#each locationTypes as way}
      <label>
        <input
          type="radio"
          bind:group={$content.jobType}
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

<p class="text-sm">{JSON.stringify($content)}</p>

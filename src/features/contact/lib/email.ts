import type { Charity, Freelance, Hire } from "./types";

const hire = (submission: Hire) => ({
  from: import.meta.env.PUBLIC_CONTACT_EMAIL,
  to: import.meta.env.PUBLIC_CONTACT_EMAIL,
  subject: `Form submission: ${submission.contactName}`,
  html: `
  <h1>Hiring Request</h1>
  <h2>Contact Details:</h2>
  <ul>
    <li>Name: ${submission.contactName}</li>
    <li>Email: <a href="mailto:${submission.contactEmail}">${
      submission.contactEmail
    }</a></li>
  </ul>
  <h2>Company:</h2>
  <ul>
  <li>Name: ${submission.companyName || "No company name provided"}</li>
  <li>Website: ${submission.website || "No website provided"}</li>
  <li>Size: ${submission.companySize}</li>
  <li>Industry: ${submission.industry}</li>
  <li>Location: ${submission.location}</li>
  </ul>
  <h2>Opportunity:</h2>
  <ul>
  <li>Title: ${submission.jobTitle}</li>
  <li>Type: ${submission.jobType}</li>
  <li>Way of working: ${submission.locationType}</li>
  </ul>
  `,
  text: `
  Hiring Request\n\n
  Contact Details:\n
    - Name: ${submission.contactName}\n
    - Email: ${submission.contactEmail}}\n
  \n\n
  Company:\n
    - Name: ${submission.companyName || "No company name provided"}\n
    - Website: ${submission.website || "No website provided"}\n
    - Size: ${submission.companySize}\n
    - Industry: ${submission.industry}\n
    - Location: ${submission.location}\n
  \n\n
  Opportunity:\n
    - Title: ${submission.jobTitle}\n
    - Type: ${submission.jobType}\n
    - Way of working: ${submission.locationType}\n
  `,
});

const freelance = (submission: Freelance) => ({
  from: import.meta.env.PUBLIC_CONTACT_EMAIL,
  to: import.meta.env.PUBLIC_CONTACT_EMAIL,
  subject: `Form submission: ${submission.contactName}`,
  html: `
  <h1>Freelance Work Request</h1>
  <h2>Contact Details:</h2>
  <ul>
    <li>Name: ${submission.contactName}</li>
    <li>Email: <a href="mailto:${submission.contactEmail}">${
      submission.contactEmail
    }</a></li>
  </ul>
  <h2>Company:</h2>
  <ul>
  <li>Name: ${submission.companyName || "No company name provided"}</li>
  <li>Website: ${submission.website || "No website provided"}</li>
  <li>Industry: ${submission.industry}</li>
  </ul>
  <h2>Opportunity:</h2>
  <ul>
  <li>Budget: ${submission.budget}</li>
  <li>Skills requested:
    <ul>
    ${submission.skills.map((skill) => `<li>${skill}</li>`)}
    </ul>
  </li>
  <li>Features requested:
    <ul>
    ${submission.features.map((feature) => `<li>${feature}</li>`)}
    </ul>
  </li>
  </ul>
  `,
  text: `
  Hiring Request\n\n
  Contact Details:\n
    - Name: ${submission.contactName}\n
    - Email: ${submission.contactEmail}}\n
  \n\n
  Company:\n
    - Name: ${submission.companyName || "No company name provided"}\n
    - Website: ${submission.website || "No website provided"}\n
    - Industry: ${submission.industry}\n
  \n\n
  Opportunity:\n
    - Budget: ${submission.budget}\n
    - Skills requested:\n
    ${submission.skills.map((skill) => `\t-${skill}\n`)}
    - Features requested:\n
    ${submission.features.map((feature) => `\t-${feature}\n`)}
  `,
});

const charity = (submission: Charity) => ({
  from: import.meta.env.PUBLIC_CONTACT_EMAIL,
  to: import.meta.env.PUBLIC_CONTACT_EMAIL,
  subject: `Form submission: ${submission.contactName}`,
  html: `
  <h1>Freelance Work Request</h1>
  <h2>Contact Details:</h2>
  <ul>
    <li>Name: ${submission.contactName}</li>
    <li>Email: <a href="mailto:${submission.contactEmail}">${
      submission.contactEmail
    }</a></li>
  </ul>
  <h2>Company:</h2>
  <ul>
  <li>Name: ${submission.companyName || "No company name provided"}</li>
  <li>Website: ${submission.website || "No website provided"}</li>
  </ul>
  <h2>Opportunity:</h2>
  <ul>
  <li>Skills requested:
    <ul>
    ${submission.skills.map((skill) => `<li>${skill}</li>`)}
    </ul>
  </li>
  <li>Features requested:
    <ul>
    ${submission.features.map((feature) => `<li>${feature}</li>`)}
    </ul>
  </li>
  </ul>
  `,
  text: `
  Hiring Request\n\n
  Contact Details:\n
    - Name: ${submission.contactName}\n
    - Email: ${submission.contactEmail}}\n
  \n\n
  Company:\n
    - Name: ${submission.companyName || "No company name provided"}\n
    - Website: ${submission.website || "No website provided"}\n
  \n\n
  Opportunity:\n
    - Skills requested:\n
    ${submission.skills.map((skill) => `\t-${skill}\n`)}
    - Features requested:\n
    ${submission.features.map((feature) => `\t-${feature}\n`)}
  `,
});

export const createEmail = {
  hire,
  freelance,
  charity,
};

import type { APIRoute } from "astro";
import type { Hire } from "@features/contact/lib/types";
import nodemailer from "nodemailer";
import * as aws from "@aws-sdk/client-ses";
import { createEmail } from "@features/contact/lib/email";
import { validators } from "@features/contact/lib/validators";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const submission: Hire = await request.json();

    if (!validators.hire(submission)) {
      console.log("Validation failed");
      return new Response(null, { status: 500 });
    }

    if (import.meta.env.MODE === "development") {
      console.log("Skipping email in dev environment");
      console.log(createEmail.hire(submission));

      return new Response(null, { status: 204 });
    }

    const ses = new aws.SES({
      apiVersion: "2010-12-01",
      region: "eu-west-2",
      credentials: {
        accessKeyId: import.meta.env.EMAIL_API_KEY,
        secretAccessKey: import.meta.env.EMAIL_SECRET,
      },
    });

    const transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });

    const email = createEmail.hire(submission);
    await transporter.sendMail(email);

    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
};

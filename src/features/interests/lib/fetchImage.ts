import { dirname } from "path";
import { fileURLToPath } from "url";
import Jimp from "jimp";
import type { InterestType } from "./types";

/**
 * Interests feature top-level directory.
 */
const __dirname = dirname(fileURLToPath(import.meta.url + "../" + "../"));

/**
 * Fetches an image from a remote URL and saves it locally.
 *
 * @param from The URL to download an image from.
 * @param to The name of the file to save the image to (*excluding* extension like .jpg).
 *
 * @see https://docs.astro.build/en/guides/images/#images-in-public
 */
export async function fetchImage(
  from: string | null,
  to: InterestType
): Promise<void> {
  try {
    // We conditionally render an image client-side.
    if (!from) {
      return;
    }

    console.log("FETCHING:: ", to);

    const response = await fetch(from);
    const blob = await response.blob();
    const data = await blob.arrayBuffer();
    const location = `${__dirname}/images/${to}.jpg`;

    // Skip missing pictures
    if (blob.type.includes("image")) {
      console.log("SAVING LOCALLY");

      const image = await Jimp.read(Buffer.from(data));
      await image.resize(Jimp.AUTO, 128).quality(100).writeAsync(location);

      console.log("SAVED:: ", `${location}`);
    } else {
      console.log("SKIPPING:: ", `${to}`);
    }
  } catch (e) {
    console.log(`Error getting: ${from}`);
    console.log(e);
  }
}

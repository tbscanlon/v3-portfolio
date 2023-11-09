import { writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";

/**
 * Project top-level directory.
 */
const __dirname = dirname(
  fileURLToPath(import.meta.url + "../" + "../" + "../" + "../" + "../")
);

/**
 * Converts an image MIME type to its file extension.
 *
 * @param imageType the MIME type of an image (e.g., "image/jpeg")
 * @returns The file extension for a MIME type (e.g., ".jpg")
 */
function getImageFileExtension(imageType: string) {
  if (/jpeg/.test(imageType)) {
    return ".jpg";
  }

  if (/png/.test(imageType)) {
    return ".png";
  }

  if (/svg/.test(imageType)) {
    return ".svg";
  }

  if (/webp/.test(imageType)) {
    return ".webp";
  }

  if (/avif/.test(imageType)) {
    return ".avif";
  }

  return new Error(`Unknown image type: ${imageType}`);
}

/**
 * Fetches an image from a remote URL and saves it locally.
 *
 * @param from The URL to download an image from.
 * @param to The name of the file to save the image to (*excluding* extension like .jpg).
 * @returns A promise with the location of the saved image. This is without
 * the prefix for the public folder because Astro doesn't like it.
 * @see https://docs.astro.build/en/guides/images/#images-in-public
 */
export async function fetchImage(
  from: string | null,
  to: string
): Promise<string> {
  try {
    // We conditionally render an image client-side.
    if (!from) {
      return "";
    }

    const response = await fetch(from);
    const blob = await response.blob();
    const data = await blob.arrayBuffer();
    const location = `/interests/${to}${getImageFileExtension(blob.type)}`;

    await writeFile(`${__dirname}/public${location}`, Buffer.from(data));

    return location;
  } catch (e) {
    console.log(`Error getting: ${from}`);
    console.log(e);
    return "";
  }
}

import { chromium } from "playwright";
import type { Studying } from "./types";
import { fetchImage } from "./fetchImage.ts";

/**
 * Gets the current course on Udemy I'm studying. Uses the course's slug from
 * the URL on Udemy as a unique identifier.
 *
 * @param slug A URL slug for a course on Udemy.
 * @returns An object with the course's name, author and URL.
 */
export async function getStudying(slug: string): Promise<Studying> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = `https://www.udemy.com/course/${slug}/`;

  // Mimic a real user-agent to get past Cloudflare
  // (Yeah I know it's a bit cheeky but I only want to scrape the course name and author lmao)
  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.8",
  });

  await page.goto(url);

  const title = await page.locator('[data-purpose="lead-title"]').innerText();

  const author = await page
    .locator('[data-purpose="instructor-name-top"] > span > a')
    .innerText();

  const imageRemoteURL = await page
    .getByLabel("Play course preview")
    .locator("img")
    .first()
    .getAttribute("src");

  const imageLocalURL = await fetchImage(imageRemoteURL, "course");

  await context.close();
  await browser.close();

  return {
    type: "studying",
    image: imageLocalURL,
    title,
    author,
    url,
  };
}

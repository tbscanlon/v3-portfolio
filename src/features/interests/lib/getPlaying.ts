import { chromium } from "playwright";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import type { Playing } from "./types";
import { createWriteStream, fstat } from "fs";
import { writeFile } from "fs/promises";

/**
 * Project top-level directory.
 */
const __dirname = dirname(
  fileURLToPath(import.meta.url + "../" + "../" + "../" + "../" + "../")
);

/**
 * Gets the current game I'm playing on Steam. Uses the game's app ID from
 * the steam storefront.
 *
 * @param id The ID of a game within Steam.
 * @returns An object with the game's name, developer and URL for the game
 * on the steam storefront.
 */
export async function getPlaying(id: string): Promise<Playing> {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = `https://store.steampowered.com/app/${id}`;

  await page.goto(url);

  // Handle Steam age-verification prompt
  if (page.url().includes("agecheck")) {
    const yearDropdown = page.locator("#ageYear");
    yearDropdown.selectOption("1990");

    await page.locator("#view_product_page_btn").click();
  }

  const title = await page.locator("#appHubAppName").innerText();
  const developer = await page.locator(".dev_row > a").first().innerText();
  const image = await page
    .locator(".game_header_image_full")
    .getAttribute("src");

  // Refactor into image fetching generic function.
  if (image) {
    const res = await fetch(image);
    const data = await res.arrayBuffer();

    await writeFile(`${__dirname}/public/game.jpg`, Buffer.from(data));
  }

  await context.close();
  await browser.close();

  return {
    type: "playing",
    image: "/game.jpg",
    title,
    developer,
    url,
  };
}

import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ALBUM_ID = "f8855ad4-5db2-44a1-a781-c393cd07f4d1"; // ID of an album from the MusicBrainz db.
const GAME_ID = "1716740"; // Steam app ID.
const BOOK_ID = "9781800182813"; // ISBN-13 of a book.

/**
 * Gets the current album I'm listening to. Uses the album ID from
 * the MusicBrainz DB.
 *
 * @returns An object with the album's title, artist and cover image URL.
 */
export async function getListeningTo() {
  // MusicBrainz API times out a lot without a user-agent header.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const coverArtResponse = await fetch(
    `http://coverartarchive.org/release/f8855ad4-5db2-44a1-a781-c393cd07f4d1`,
    {
      headers,
    }
  );

  const response = await fetch(
    `http://musicbrainz.org/ws/2/release/${ALBUM_ID}?inc=artist-credits&fmt=json`,
    {
      headers,
    }
  );

  const data = await response.json();
  const coverArt = await coverArtResponse.json();

  return {
    title: data.title,
    artist: data["artist-credit"][0].name,
    image: coverArt.images[0].thumbnails.small,
    url: `https://musicbrainz.org/release/${ALBUM_ID}`,
  };
}

/**
 * Gets the current game I'm playing on Steam. Uses the game's app ID from
 * the steam storefront.
 *
 * @returns An object with the game's name, developer, banner image URL and
 * URL for the game on the steam storefront.
 */
export async function getPlaying() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = `https://store.steampowered.com/app/${GAME_ID}`;

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

  await context.close();
  await browser.close();

  return {
    title,
    developer,
    image,
    url,
  };
}

/**
 * Gets the current book I'm reading from the OpenLibrary API. Uses the book's ISBN-13
 * as the ID for the lookup.
 *
 * @returns An object with the book's name, author, cover and URL for more info.
 */
async function getReading() {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${BOOK_ID}&jscmd=details&format=json`
  );

  const data = await response.json();

  // The OpenLibrary API returns a object with the book's ISBN
  // as the top level key, so we need to dig into the object to get
  // the info we need.
  const book = data[`ISBN:${BOOK_ID}`];

  return {
    title: book.details.title,
    author: book.details.authors[0].name,
    url: book.info_url,
    /**
     * @see https://openlibrary.org/dev/docs/api/covers
     */
    image: book.thumbnail_url
      ? `https://covers.openlibrary.org/b/isbn/${BOOK_ID}-M.jpg`
      : "",
  };
}

await Promise.all([getListeningTo(), getPlaying(), getReading()]).then(
  async ([listening, playing, reading]) => {
    const interests = JSON.stringify({
      listening,
      playing,
      reading,
    });

    await fs.writeFile(
      __dirname + "/features/home/lib/interests.json",
      interests
    );
  }
);

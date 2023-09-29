import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));

const ALBUM_ID = "f8855ad4-5db2-44a1-a781-c393cd07f4d1"; // ID of an album from the MusicBrainz db.
const GAME_ID = "1716740"; // Steam app ID.
const BOOK_ID = "9781800182813"; // ISBN-13 of a book.
const COURSE_SLUG = "100-days-of-code"; // A URL slug for a course on Udemy
const TV_SHOW_ID = "tt0434706"; // ID of a TV show or film from IMDB.

/**
 * Gets the current album I'm listening to. Uses the album ID from
 * the MusicBrainz DB.
 *
 * @returns An object with the album's title, artist and URL for
 * the album on MusicBrainz.
 */
export async function getListeningTo() {
  // MusicBrainz API times out a lot without a user-agent header.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const response = await fetch(
    `http://musicbrainz.org/ws/2/release/${ALBUM_ID}?inc=artist-credits&fmt=json`,
    {
      headers,
    }
  );

  const data = await response.json();

  return {
    title: data.title,
    artist: data["artist-credit"][0].name,
    url: `https://musicbrainz.org/release/${ALBUM_ID}`,
  };
}

/**
 * Gets the current game I'm playing on Steam. Uses the game's app ID from
 * the steam storefront.
 *
 * @returns An object with the game's name, developer and URL for the game
 * on the steam storefront.
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

  await context.close();
  await browser.close();

  return {
    title,
    developer,
    url,
  };
}

/**
 * Gets the current book I'm reading from the OpenLibrary API. Uses the book's ISBN-13
 * as the ID for the lookup.
 *
 * @returns An object with the book's name, author and URL for more info.
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
  };
}

/**
 * Gets the current course on Udemy I'm studying. Uses the course's slug from
 * the URL on Udemy as a unique identifier.
 *
 * @returns An object with the course's name, author and URL.
 */
async function getStudying() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const url = `https://www.udemy.com/course/${COURSE_SLUG}/`;

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

  await context.close();
  await browser.close();

  return {
    title,
    author,
    url,
  };
}

/**
 * Gets the current TV show or film I'm watching from the TVMaze API. Uses the
 * show's IMDB ID for the lookup.
 *
 * @returns An object with the show's name, genres and an IMDB URL.
 */
async function getWatching() {
  // Need a valid user-agent header for the TVMaze public API.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const response = await fetch(
    `https://api.tvmaze.com/lookup/shows?imdb=${TV_SHOW_ID}`,
    {
      headers,
    }
  );

  const data = await response.json();

  const url = `https://www.imdb.com/title/${data.externals.imdb}`;
  const title = data.name;
  const genres = data.genres.join(" | ");

  return {
    title,
    genres,
    url,
  };
}

await Promise.all([
  getListeningTo(),
  getPlaying(),
  getReading(),
  getStudying(),
  getWatching(),
]).then(async ([listening, playing, reading, studying, watching]) => {
  const interests = JSON.stringify({
    listening,
    playing,
    reading,
    studying,
    watching,
  });

  await fs.writeFile(
    __dirname + "/features/home/lib/interests.json",
    interests
  );
});

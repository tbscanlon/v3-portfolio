/**
 * Looks up data for various things I'm interested in. This data is
 * shown on the home page.
 *
 * Right now, I'm getting data for the following:
 *
 * - What album I'm listening to;
 * - What game I'm playing;
 * - What book I'm reading;
 * - What course I'm studying;
 * - What TV show or film I'm watching;
 *
 * This data is all sourced from publicly available information. Some
 * data is sourced via public APIs, and some is scraped from their respective
 * websites.
 *
 * This code is *only* executed via `npm run get-interests` to generate a JSON file
 * which is then used as my cached source of truth within `src/features/interests/components/*`.
 * I do this to make sure I don't hit any API limits and for ensure a high page load speed.
 */

import fs from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import prettier from "prettier";

import { getListeningTo } from "./getListeningTo.ts";
import { getPlaying } from "./getPlaying.ts";
import { getReading } from "./getReading.ts";
import { getStudying } from "./getStudying.ts";
import { getWatching } from "./getWatching.ts";

/**
 * directory of /src.
 */
const __dirname = dirname(
  fileURLToPath(import.meta.url + "../" + "../" + "../" + "../")
);

/**
 * Identifiers of my current interests.
 */
const ids = {
  /**
   * ID of an album from the MusicBrainz db.
   * @see https://musicbrainz.org/
   */
  album: "f8855ad4-5db2-44a1-a781-c393cd07f4d1",

  /**
   * ID of a game from Steam.
   * @see https://store.steampowered.com/
   */
  game: "1716740",

  /**
   * ISBN-13 of a book.
   * @see https://isbnsearch.org
   */
  book: "9781800182813",

  /**
   * Slug of a particular course on Udemy.
   * @see https://www.udemy.com/
   */
  course: "100-days-of-code",

  /**
   * ID of a show on IMDB.
   * @see https://www.imdb.com/
   */
  show: "tt0434706",
};

await Promise.all([
  getListeningTo(ids.album),
  getPlaying(ids.game),
  getReading(ids.book),
  getStudying(ids.course),
  getWatching(ids.show),
]).then(async (interests) => {
  const dir = `${__dirname}/content/interests`;

  const formatted = interests.map(
    async (interest) =>
      await prettier.format(JSON.stringify(interests), {
        parser: "json",
      })
  );

  await fs.writeFile(`${dir}/interests.json`, formatted);
});

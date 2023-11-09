import { fetchImage } from "./fetchImage.ts";
import type { Watching } from "./types";

/**
 * Gets the current TV show or film I'm watching from the TVMaze API. Uses the
 * show's IMDB ID for the lookup.
 *
 * @param id The ID of a film or TV show on IMDB.
 * @returns An object with the show's name, genres and an IMDB URL.
 */
export async function getWatching(id: string): Promise<Watching> {
  // Need a valid user-agent header for the TVMaze public API.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const response = await fetch(
    `https://api.tvmaze.com/lookup/shows?imdb=${id}`,
    {
      headers,
    }
  );

  const data = await response.json();

  const url = `https://www.imdb.com/title/${data.externals.imdb}`;
  const title = data.name;
  const genres = data.genres.join(" | ");
  const imageRemoteURL = data.image.medium;

  const imageLocalURL = await fetchImage(imageRemoteURL, "show");

  return {
    type: "watching",
    image: imageLocalURL,
    title,
    genres,
    cta: {
      url,
      text: "View on IMDB",
    },
  };
}

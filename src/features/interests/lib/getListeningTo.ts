import type { Listening } from "./types";

/**
 * Gets the current album I'm listening to. Uses the album ID from
 * the MusicBrainz DB.
 *
 * @param id ID of an album from the MusicBrainz database.
 * @returns An object with the album's title, artist and URL for
 * the album on MusicBrainz.
 */
export async function getListeningTo(id: string): Promise<Listening>  {
  // MusicBrainz API times out a lot without a user-agent header.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const response = await fetch(
    `http://musicbrainz.org/ws/2/release/${id}?inc=artist-credits&fmt=json`,
    {
      headers,
    }
  );

  const data = await response.json();

  return {
    type: "listening",
    title: data.title,
    artist: data["artist-credit"][0].name,
    url: `https://musicbrainz.org/release/${id}`,
  };
}

import { fetchImage } from "./fetchImage.ts";
import type { Listening } from "./types";

/**
 * An incomplete representation of a related URL
 * from MusicBrainz.
 */
interface Relation {
  url: {
    resource: string;
  };
}

/**
 * Extracts the Spotify streaming URL for an album.
 *
 * @param relations A list of related URLs for an album, as provided by
 * the MusicBrainz API.
 * @returns The URL for streaming the album on Spotify.
 */
function getStreamingURL(relations: Relation[]) {
  const urls: string[] = relations.map((link) => link.url.resource);

  const spotifyURL = urls.find((url) => /spotify/.test(url));

  return spotifyURL || urls[0];
}

/**
 * Gets the current album I'm listening to. Uses the album ID from
 * the MusicBrainz DB.
 *
 * @param id ID of an album from the MusicBrainz database.
 * @returns An object with the album's title, artist and URL for
 * the album on MusicBrainz.
 */
export async function getListeningTo(id: string): Promise<Listening> {
  // MusicBrainz API times out a lot without a user-agent header.
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append(
    "User-Agent",
    "TomsPortfolio/1.0 (https://www.scanlon.international)"
  );

  const response = await fetch(
    `http://musicbrainz.org/ws/2/release/${id}?inc=artist-credits+url-rels&fmt=json`,
    {
      headers,
    }
  );

  const data = await response.json();
  const imageResponse = await fetch(`http://coverartarchive.org/release/${id}`);
  const streamingURL = getStreamingURL(data.relations);

  const imageData = await imageResponse.json();
  const imageRemoteURL = imageData.images[0].thumbnails.small;

  await fetchImage(imageRemoteURL, "listening");

  return {
    type: "listening",
    title: data.title,
    artist: data["artist-credit"][0].name,
    cta: {
      url: streamingURL,
      text: "Listen on Spotify",
    },
  };
}

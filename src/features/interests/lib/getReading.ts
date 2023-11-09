import { fetchImage } from "./fetchImage.ts";
import type { Reading } from "./types";

/**
 * Gets the current book I'm reading from the OpenLibrary API. Uses the book's ISBN-13
 * as the ID for the lookup.
 *
 * @param id The ISBN-13 of a book.
 * @returns An object with the book's name, author and URL for more info.
 */
export async function getReading(id: string): Promise<Reading> {
  const response = await fetch(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${id}&jscmd=details&format=json`
  );

  const data = await response.json();

  // The OpenLibrary API returns a object with the book's ISBN
  // as the top level key, so we need to dig into the object to get
  // the info we need.
  const book = data[`ISBN:${id}`];

  // https://covers.openlibrary.org/b/isbn/9781800182813-M.jpg&default=false

  const imageLocalURL = await fetchImage(
    `https://covers.openlibrary.org/b/isbn/${id}-M.jpg&default=false`,
    "book"
  );

  return {
    type: "reading",
    title: book.details.title,
    author: book.details.authors[0].name,
    image: imageLocalURL,
    cta: {
      url: book.info_url,
      text: "View on OpenLibrary",
    },
  };
}

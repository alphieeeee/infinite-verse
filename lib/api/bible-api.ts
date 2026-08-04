import type {
  BibleApiBooksResponse,
  BibleApiChaptersResponse,
  BibleApiRandomResponse,
  BibleApiTranslationsResponse,
  BibleApiVersesResponse,
} from "../types/bible";
import { bibleApiEndpoints } from "./endpoints";

async function fetchJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) return null;
  return response.json() as Promise<T>;
}

export async function getTranslations(): Promise<BibleApiTranslationsResponse | null> {
  return fetchJson<BibleApiTranslationsResponse>(bibleApiEndpoints.translations);
}

export async function getBooks(translationId: string): Promise<BibleApiBooksResponse | null> {
  return fetchJson<BibleApiBooksResponse>(bibleApiEndpoints.books(translationId));
}

export async function getChapters(
  translationId: string,
  bookId: string,
): Promise<BibleApiChaptersResponse | null> {
  return fetchJson<BibleApiChaptersResponse>(bibleApiEndpoints.chapters(translationId, bookId));
}

export async function getVerses(
  translationId: string,
  bookId: string,
  chapter: number | string,
): Promise<BibleApiVersesResponse | null> {
  return fetchJson<BibleApiVersesResponse>(bibleApiEndpoints.verses(translationId, bookId, chapter));
}

export async function getPassage(
  translationId: string,
  bookId: string,
  chapter: number | string,
): Promise<BibleApiVersesResponse | null> {
  return getVerses(translationId, bookId, chapter);
}

export async function getRandomPassage(translationId = "web"): Promise<BibleApiRandomResponse | null> {
  return fetchJson<BibleApiRandomResponse>(bibleApiEndpoints.randomVerse(translationId));
}

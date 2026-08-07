import { get, ref, remove, set, type DataSnapshot } from "firebase/database";
import { getFirebaseDatabase } from "./firebase";
import type { FavoriteVerse, FavoriteVerseInput } from "../types/favorites";

function getErrorMessage(error: unknown, fallbackMessage: string) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallbackMessage;
}

function buildFavoritePath(userId: string, translationId: string, bookId: string, chapter: string, verse: string) {
  return `${userId}/favorites/${translationId}/${bookId}/${chapter}/${verse}`;
}

function assertFavoriteKey(value: string, fieldName: string) {
  if (value.trim().length === 0) {
    throw new Error(`Invalid favorite data: ${fieldName} is required.`);
  }
}

export async function addFavorite(favorite: FavoriteVerseInput): Promise<FavoriteVerse> {
  try {
    const db = getFirebaseDatabase();
    assertFavoriteKey(favorite.userId, "userId");
    assertFavoriteKey(favorite.translationId, "translationId");
    assertFavoriteKey(favorite.bookId, "bookId");
    assertFavoriteKey(favorite.chapter, "chapter");
    assertFavoriteKey(favorite.verse, "verse");

    const favoriteData: FavoriteVerse = {
      ...favorite,
      createdAt: new Date().toISOString(),
    };

    const favoriteRef = ref(
      db,
      buildFavoritePath(favorite.userId, favorite.translationId, favorite.bookId, favorite.chapter, favorite.verse),
    );

    await set(favoriteRef, favoriteData);
    return favoriteData;
  } catch (error) {
    throw new Error(`Failed to add favorite verse: ${getErrorMessage(error, "Unknown database error.")}`);
  }
}

export async function removeFavorite(
  userId: string,
  translationId: string,
  bookId: string,
  chapter: string,
  verse: string,
): Promise<void> {
  try {
    const db = getFirebaseDatabase();
    assertFavoriteKey(userId, "userId");
    assertFavoriteKey(translationId, "translationId");
    assertFavoriteKey(bookId, "bookId");
    assertFavoriteKey(chapter, "chapter");
    assertFavoriteKey(verse, "verse");

    await remove(ref(db, buildFavoritePath(userId, translationId, bookId, chapter, verse)));
  } catch (error) {
    throw new Error(`Failed to remove favorite verse: ${getErrorMessage(error, "Unknown database error.")}`);
  }
}

export async function getFavorite(
  userId: string,
  translationId: string,
  bookId: string,
  chapter: string,
  verse: string,
): Promise<FavoriteVerse | null> {
  try {
    const db = getFirebaseDatabase();
    assertFavoriteKey(userId, "userId");
    assertFavoriteKey(translationId, "translationId");
    assertFavoriteKey(bookId, "bookId");
    assertFavoriteKey(chapter, "chapter");
    assertFavoriteKey(verse, "verse");

    const snapshot: DataSnapshot = await get(
      ref(db, buildFavoritePath(userId, translationId, bookId, chapter, verse)),
    );

    return snapshot.exists() ? (snapshot.val() as FavoriteVerse) : null;
  } catch (error) {
    throw new Error(`Failed to get favorite verse: ${getErrorMessage(error, "Unknown database error.")}`);
  }
}

export async function getFavorites(userId: string): Promise<FavoriteVerse[]> {
  try {
    const db = getFirebaseDatabase();
    assertFavoriteKey(userId, "userId");
    const snapshot = await get(ref(db, `${userId}/favorites`));

    if (!snapshot.exists()) {
      return [];
    }

    const favorites: FavoriteVerse[] = [];
    const translations = snapshot.val() as Record<string, Record<string, Record<string, Record<string, FavoriteVerse>>>>;

    for (const books of Object.values(translations)) {
      for (const chapters of Object.values(books)) {
        for (const verses of Object.values(chapters)) {
          favorites.push(...Object.values(verses));
        }
      }
    }

    return favorites.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (error) {
    throw new Error(`Failed to get favorite verses: ${getErrorMessage(error, "Unknown database error.")}`);
  }
}

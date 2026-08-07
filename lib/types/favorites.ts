export type FavoriteVerse = {
  userId: string;
  translationId: string;
  bookId: string;
  chapter: string;
  verse: string;
  reference: string;
  text: string;
  createdAt: string;
};

export type FavoriteVerseInput = Omit<FavoriteVerse, "createdAt">;

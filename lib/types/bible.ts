export type BibleApiTranslation = {
  identifier: string;
  name: string;
  language: string;
  language_code: string;
  license: string;
  url?: string;
};

export type BibleApiRandomVerse = {
  book_id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

export type BibleApiRandomResponse = {
  translation: BibleApiTranslation;
  random_verse: BibleApiRandomVerse;
};

export type BibleApiTranslationItem = BibleApiTranslation;

export type BibleApiTranslationsResponse = {
  translations: BibleApiTranslationItem[];
};

export type BibleApiBook = {
  id: string;
  name: string;
  url: string;
};

export type BibleApiBooksResponse = {
  translation: BibleApiTranslation;
  books: BibleApiBook[];
};

export type BibleApiChapter = {
  book_id: string;
  book: string;
  chapter: number;
  url: string;
};

export type BibleApiChaptersResponse = {
  translation: BibleApiTranslation;
  chapters: BibleApiChapter[];
};

export type BibleApiVerse = {
  book_id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
};

export type BibleApiVersesResponse = {
  translation: BibleApiTranslation;
  verses: BibleApiVerse[];
};

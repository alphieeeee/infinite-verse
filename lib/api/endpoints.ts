export const bibleApiEndpoints = {
  translations: "https://bible-api.com/data",
  books: (translationId: string) => `https://bible-api.com/data/${encodeURIComponent(translationId)}`,
  chapters: (translationId: string, bookId: string) =>
    `https://bible-api.com/data/${encodeURIComponent(translationId)}/${encodeURIComponent(bookId)}`,
  verses: (translationId: string, bookId: string, chapter: number | string) =>
    `https://bible-api.com/data/${encodeURIComponent(translationId)}/${encodeURIComponent(bookId)}/${encodeURIComponent(String(chapter))}`,
  randomVerse: (translationId = "web") =>
    `https://bible-api.com/data/${encodeURIComponent(translationId)}/random`,
};

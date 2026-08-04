export function formatVerseRef(
  translationId: string,
  bookId: string,
  chapter: string,
  verse?: string,
) {
  return [translationId.toUpperCase(), bookId.toUpperCase(), chapter, verse]
    .filter(Boolean)
    .join(" ");
}

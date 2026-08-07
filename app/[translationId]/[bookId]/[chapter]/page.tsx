import { getBooks, getPassage } from "../../../../lib/api/bible-api";
import VerseProjector from "../../../components/verse/VerseProjector";
import type { BibleApiVerse } from "../../../../lib/types/bible";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ translationId: string; bookId: string; chapter: string }>;
}) {
  const { translationId, bookId, chapter } = await params;
  const [booksResponse, verseResponse] = await Promise.all([getBooks(translationId), getPassage(translationId, bookId, chapter)]);
  const book = booksResponse?.books.find((item) => item.id === bookId.toUpperCase()) ?? booksResponse?.books[0];
  const verses = verseResponse?.verses ?? [];
  const initialVerse: BibleApiVerse | null = verses[0] ?? null;
  const translationLabel = verseResponse?.translation.language ?? "English";
  const bookLabel = book?.name ?? bookId.toUpperCase();

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <VerseProjector
        verses={verses}
        translationLabel={translationLabel}
        bookLabel={bookLabel}
        translationHref={`/${translationId}`}
        bookHref={`/${translationId}/${bookId}`}
        initialVerse={initialVerse}
        translationId={translationId}
        bookId={bookId}
      />
    </main>
  );
}

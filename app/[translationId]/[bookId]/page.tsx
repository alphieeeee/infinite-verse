import { getBooks, getChapters } from "../../../lib/api/bible-api";
import Breadcrumbs from "../../components/layout/Breadcrumbs";
import ChapterGrid from "../../components/gallery/ChapterGrid";
import PageHero from "../../components/hero/PageHero";
import ErrorState from "../../components/ui/ErrorState";
import Link from "next/link";

export default async function BookPage({
  params,
}: {
  params: Promise<{ translationId: string; bookId: string }>;
}) {
  const { translationId, bookId } = await params;
  const [booksResponse, chaptersResponse] = await Promise.all([getBooks(translationId), getChapters(translationId, bookId)]);
  const book = booksResponse?.books.find((item) => item.id === bookId.toUpperCase()) ?? booksResponse?.books[0];
  const chapters = chaptersResponse?.chapters ?? [];
  const translationLabel = booksResponse?.translation.language ?? "English";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <PageHero
        eyebrow="Book of"
        title={book?.name?.toUpperCase() ?? bookId.toUpperCase()}
        description=""
      />
      <Breadcrumbs
        items={[
          { label: "SCRIPTURE", href: "/" },
          { label: translationLabel, href: `/${translationId}` },
          { label: book?.name?.toUpperCase() ?? bookId.toUpperCase() },
        ]}
      />
      {chapters.length === 0 ? (
        <ErrorState
          message="No chapters were found for this book. Please click back and choose another book or translation."
        />
      ) : (
        <ChapterGrid translationId={translationId} bookId={bookId} chapters={chapters} />
      )}
      {chapters.length === 0 ? (
        <div>
          <Link
            href={`/${translationId}`}
            className="inline-flex rounded-full border border-[#ceccff]/35 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 theme-accent-border-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus"
          >
            Back to books
          </Link>
        </div>
      ) : null}
    </main>
  );
}

import { getBooks } from "../../lib/api/bible-api";
import Breadcrumbs from "../components/layout/Breadcrumbs";
import PageHero from "../components/hero/PageHero";
import BookCarousel from "../components/gallery/BookCarousel";
import { filterBooksByTestament } from "../../lib/helpers/bookTestament";

export default async function TranslationPage({
  params,
}: {
  params: Promise<{ translationId: string }>;
}) {
  const { translationId } = await params;
  const booksResponse = await getBooks(translationId);
  const books = booksResponse?.books ?? [];
  const oldBooks = filterBooksByTestament(books, "old");
  const newBooks = filterBooksByTestament(books, "new");
  const translationLabel = booksResponse?.translation.language ?? "English";

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <PageHero
        eyebrow=""
        title="Every journey begins with a single verse."
        description="Explore Scripture at your own pace, one passage at a time."
      />
      <Breadcrumbs items={[{ label: "SCRIPTURE", href: "/" }, { label: translationLabel, href: `/${translationId}` }]} />
      <div className="space-y-10">
        <BookCarousel
          title="Old Testament"
          description=""
          translationId={translationId}
          books={oldBooks}
        />
        <BookCarousel
          title="New Testament"
          description=""
          translationId={translationId}
          books={newBooks}
        />
      </div>
    </main>
  );
}

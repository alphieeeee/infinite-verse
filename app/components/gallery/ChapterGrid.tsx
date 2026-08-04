import Link from "next/link";
import { buildRoute } from "../../../lib/helpers/buildRoute";
import type { BibleApiChapter } from "../../../lib/types/bible";

export default function ChapterGrid({
  translationId,
  bookId,
  chapters,
}: {
  translationId: string;
  bookId: string;
  chapters: BibleApiChapter[];
}) {
  return (
    <section aria-labelledby="chapters-gallery-title" className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] theme-accent-soft">Chapters</p>
        <h2 id="chapters-gallery-title" className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Browse the chapters in this book.
        </h2>
      </div>

      <div className="grid grid-cols-6 gap-2 sm:grid-cols-8 lg:grid-cols-12 sm:gap-3">
        {chapters.map((chapter) => (
          <Link
            key={`${chapter.book_id}-${chapter.chapter}`}
            href={buildRoute(translationId, bookId, String(chapter.chapter))}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-center text-white transition hover:bg-white/10 theme-accent-border-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus sm:p-3"
          >
            <p className="text-sm font-semibold text-white sm:text-base">{chapter.chapter}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

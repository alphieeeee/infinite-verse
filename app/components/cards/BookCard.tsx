import Link from "next/link";
import { buildRoute } from "../../../lib/helpers/buildRoute";
import type { BibleApiBook } from "../../../lib/types/bible";

export default function BookCard({
  translationId,
  book,
}: {
  translationId: string;
  book: BibleApiBook;
}) {
  return (
    <Link
      href={buildRoute(translationId, book.id)}
      className="flex h-full min-h-[132px] flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-4 text-white transition hover:border-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em]">Book of</p>
        <h3 className="mt-2 text-lg font-semibold leading-tight uppercase theme-accent">{book.name}</h3>
      </div>
    </Link>
  );
}

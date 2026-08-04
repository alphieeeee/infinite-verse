"use client";

import type { BibleApiVerse } from "../../../lib/types/bible";

type VerseHeroProps = {
  verse: BibleApiVerse | null;
  bookLabel: string;
};

export default function VerseHero({ verse, bookLabel }: VerseHeroProps) {
  const reference = verse ? `${verse.book} ${verse.chapter}:${verse.verse}` : `${bookLabel} 1:1`;

  return (
    <section className="relative flex max-h-[72vh] min-h-[50vh] flex-col rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.16em] text-white/65 sm:text-xs">{reference}</p>
        </div>

        <button
          type="button"
          aria-label="Favorite verse"
          className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-white/25 hover:bg-white/10"
        >
          Favorite
        </button>
      </div>

      <div className="flex flex-1 items-center justify-center py-5 sm:py-7">
        <p className="max-h-[14rem] max-w-4xl overflow-y-auto px-2 text-center text-lg leading-relaxed text-white sm:text-xl lg:text-2xl theme-accent">
          {verse?.text ?? "Select a verse to preview it here."}
        </p>
      </div>
    </section>
  );
}

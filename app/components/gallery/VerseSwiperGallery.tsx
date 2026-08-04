"use client";

import { useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { BibleApiVerse } from "../../../lib/types/bible";

type VerseSwiperGalleryProps = {
  verses: BibleApiVerse[];
  selectedVerse: BibleApiVerse | null;
  onSelectVerse: (verse: BibleApiVerse) => void;
};

export default function VerseSwiperGallery({ verses, selectedVerse, onSelectVerse }: VerseSwiperGalleryProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const selectedKey = useMemo(() => {
    if (!selectedVerse) return null;
    return `${selectedVerse.book_id}-${selectedVerse.chapter}-${selectedVerse.verse}`;
  }, [selectedVerse]);

  if (verses.length === 0) return null;

  return (
    <section aria-labelledby="verses-gallery-title" className="space-y-4">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] theme-accent-soft">Verses</p>
        <h2 id="verses-gallery-title" className="sr-only">
          Verse gallery
        </h2>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-2 flex touch-pan-y">
          {verses.map((verse) => {
            const isSelected =
              selectedKey === `${verse.book_id}-${verse.chapter}-${verse.verse}`;

            return (
              <div
                key={`${verse.book_id}-${verse.chapter}-${verse.verse}`}
                className="min-w-0 flex-[0_0_16.6667%] pl-2 sm:flex-[0_0_12.5%] lg:flex-[0_0_8.3333%]"
              >
                <button
                  type="button"
                  onClick={() => onSelectVerse(verse)}
                  aria-label={`Select verse ${verse.verse}`}
                  aria-pressed={isSelected}
                  className={[
                    "flex w-full items-center justify-center rounded-xl border px-2 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus",
                    isSelected
                      ? "theme-accent-border-strong theme-accent-bg-soft text-white"
                      : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10 theme-accent-border-hover",
                  ].join(" ")}
                >
                  {verse.verse}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

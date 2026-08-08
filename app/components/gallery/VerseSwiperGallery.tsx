"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { BibleApiVerse } from "../../../lib/types/bible";

type VerseSwiperGalleryProps = {
  verses: BibleApiVerse[];
  selectedVerse: BibleApiVerse | null;
  onSelectVerse: (verse: BibleApiVerse) => void;
};

export default function VerseSwiperGallery({ verses, selectedVerse, onSelectVerse }: VerseSwiperGalleryProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: 6,
    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 8,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 12,
      },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const selectedKey = useMemo(() => {
    if (!selectedVerse) return null;
    return `${selectedVerse.book_id}-${selectedVerse.chapter}-${selectedVerse.verse}`;
  }, [selectedVerse]);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const rafId = window.requestAnimationFrame(updateButtons);
    emblaApi.on("reInit", updateButtons);
    emblaApi.on("select", updateButtons);

    return () => {
      window.cancelAnimationFrame(rafId);
      emblaApi.off("reInit", updateButtons);
      emblaApi.off("select", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  if (verses.length === 0) return null;

  return (
    <section aria-labelledby="verses-gallery-title" className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] theme-accent">Verses</p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Scroll verses left"
            className="cursor-pointer rounded-full border theme-accent-border bg-white/5 px-3 py-2 text-sm text-white transition theme-accent-border-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Scroll verses right"
            className="cursor-pointer rounded-full border theme-accent-border bg-white/5 px-3 py-2 text-sm text-white transition theme-accent-border-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      <h2 id="verses-gallery-title" className="sr-only">
        Verse gallery
      </h2>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-2 flex touch-pan-y">
          {verses.map((verse) => {
            const isSelected =
              selectedKey === `${verse.book_id}-${verse.chapter}-${verse.verse}`;

            return (
              <div
                key={`${verse.book_id}-${verse.chapter}-${verse.verse}`}
                className="min-w-0 flex-[0_0_16.6667%] pl-2 md:flex-[0_0_12.5%] lg:flex-[0_0_8.3333%]"
              >
                <button
                  type="button"
                  onClick={() => onSelectVerse(verse)}
                  aria-label={`Select verse ${verse.verse}`}
                  aria-pressed={isSelected}
                  className={[
                    "flex w-full cursor-pointer items-center justify-center rounded-xl border px-2 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus",
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

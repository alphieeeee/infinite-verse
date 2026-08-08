"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import BookCard from "../cards/BookCard";
import type { BibleApiBook } from "../../../lib/types/bible";

type BookCarouselProps = {
  title: string;
  description: string;
  translationId: string;
  books: BibleApiBook[];
};

export default function BookCarousel({ title, description, translationId, books }: BookCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    slidesToScroll: 2,
    breakpoints: {
      "(min-width: 768px)": {
        slidesToScroll: 3,
      },
      "(min-width: 1024px)": {
        slidesToScroll: 4,
      },
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  if (books.length === 0) return null;

  return (
    <section aria-labelledby="books-gallery-title" className="col-span-12 space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] theme-accent">{title}</p>
          <h2 id="books-gallery-title" className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
            {description}
          </h2>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label={`Scroll ${title} books left`}
            className="cursor-pointer rounded-full border theme-accent-border bg-white/5 px-3 py-2 text-sm text-white transition theme-accent-border-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label={`Scroll ${title} books right`}
            className="cursor-pointer rounded-full border theme-accent-border bg-white/5 px-3 py-2 text-sm text-white transition theme-accent-border-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex touch-pan-y">
          {books.map((book) => (
            <div key={book.id} className="min-w-0 flex-[0_0_50%] pl-4 md:flex-[0_0_33.3333%] lg:flex-[0_0_25%]">
              <BookCard translationId={translationId} book={book} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

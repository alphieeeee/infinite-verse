"use client";

import { useState } from "react";
import Breadcrumbs from "../layout/Breadcrumbs";
import type { BibleApiVerse } from "../../../lib/types/bible";
import VerseHero from "../hero/VerseHero";
import VerseSwiperGallery from "../gallery/VerseSwiperGallery";
import AnimPanning from "../gsap/AnimPanning";

type VerseProjectorProps = {
  verses: BibleApiVerse[];
  translationLabel: string;
  bookLabel: string;
  translationHref: string;
  bookHref: string;
  initialVerse: BibleApiVerse | null;
  translationId: string;
  bookId: string;
};

export default function VerseProjector({
  verses,
  translationLabel,
  bookLabel,
  translationHref,
  bookHref,
  initialVerse,
  translationId,
  bookId,
}: VerseProjectorProps) {
  const [selectedVerse, setSelectedVerse] = useState<BibleApiVerse | null>(initialVerse);
  const selectedReference = selectedVerse
    ? `${bookLabel.toUpperCase()} ${selectedVerse.chapter}:${selectedVerse.verse}`
    : bookLabel.toUpperCase();

  return (
    <div className="space-y-8">
      <VerseHero
        verse={selectedVerse}
        bookLabel={bookLabel}
        translationId={translationId}
        bookId={bookId}
      />
      <Breadcrumbs
        items={[
          { label: "SCRIPTURE", href: "/" },
          { label: translationLabel.toUpperCase(), href: translationHref },
          { label: bookLabel.toUpperCase(), href: bookHref },
          { label: selectedReference.toUpperCase() },
        ]}
      />
      <AnimPanning
        duration={0.8}
        delay={0.2}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
        onScroll={false}>
        <VerseSwiperGallery verses={verses} selectedVerse={selectedVerse} onSelectVerse={setSelectedVerse} />
      </AnimPanning>

    </div>
  );
}

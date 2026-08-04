"use client";

import { useState } from "react";
import Breadcrumbs from "../layout/Breadcrumbs";
import type { BibleApiVerse } from "../../../lib/types/bible";
import VerseHero from "../hero/VerseHero";
import VerseSwiperGallery from "../gallery/VerseSwiperGallery";

type VerseProjectorProps = {
  verses: BibleApiVerse[];
  translationLabel: string;
  bookLabel: string;
  translationHref: string;
  bookHref: string;
  initialVerse: BibleApiVerse | null;
};

export default function VerseProjector({
  verses,
  translationLabel,
  bookLabel,
  translationHref,
  bookHref,
  initialVerse,
}: VerseProjectorProps) {
  const [selectedVerse, setSelectedVerse] = useState<BibleApiVerse | null>(initialVerse);
  const selectedReference = selectedVerse
    ? `${bookLabel.toUpperCase()} ${selectedVerse.chapter}:${selectedVerse.verse}`
    : bookLabel.toUpperCase();

  return (
    <div className="space-y-8">
      <VerseHero verse={selectedVerse} translationLabel={translationLabel} bookLabel={bookLabel} />
      <Breadcrumbs
        items={[
          { label: "BIBLE", href: "/" },
          { label: translationLabel.toUpperCase(), href: translationHref },
          { label: bookLabel.toUpperCase(), href: bookHref },
          { label: selectedReference.toUpperCase() },
        ]}
      />
      <VerseSwiperGallery verses={verses} selectedVerse={selectedVerse} onSelectVerse={setSelectedVerse} />
    </div>
  );
}

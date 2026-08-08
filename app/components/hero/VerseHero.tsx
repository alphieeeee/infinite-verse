"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { addFavorite, getFavorite, removeFavorite } from "../../../lib/api/favorites";
import { routes } from "../../../lib/constants/routes";
import type { BibleApiVerse } from "../../../lib/types/bible";
import { useAuth } from "../auth/AuthProvider";
import AnimPanning from "../gsap/AnimPanning";

type VerseHeroProps = {
  verse: BibleApiVerse | null;
  bookLabel: string;
  translationId: string;
  bookId: string;
};

export default function VerseHero({ verse, bookLabel, translationId, bookId }: VerseHeroProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthReady } = useAuth();
  const [savedFavoriteKey, setSavedFavoriteKey] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [favoriteError, setFavoriteError] = useState("");
  const reference = verse ? `${verse.book || bookLabel} ${verse.chapter}:${verse.verse}` : `${bookLabel} 1:1`;
  const favoriteKey = user && verse ? `${user.id}/${translationId}/${bookId}/${verse.chapter}/${verse.verse}` : null;
  const isFavorite = favoriteKey !== null && savedFavoriteKey === favoriteKey;

  useEffect(() => {
    if (!user || !verse) {
      return;
    }

    let isCurrent = true;

    getFavorite(user.id, translationId, bookId, String(verse.chapter), String(verse.verse))
      .then((favorite) => {
        if (isCurrent) setSavedFavoriteKey(favorite ? `${user.id}/${translationId}/${bookId}/${verse.chapter}/${verse.verse}` : null);
      })
      .catch(() => {
        if (isCurrent) setSavedFavoriteKey(null);
      });

    return () => {
      isCurrent = false;
    };
  }, [bookId, translationId, user, verse]);

  async function handleFavorite() {
    if (!isAuthReady || !verse) return;

    if (!user) {
      router.push(`${routes.login}?next=${encodeURIComponent(pathname)}`);
      return;
    }

    setFavoriteError("");
    setIsSaving(true);

    try {
      if (isFavorite) {
        await removeFavorite(user.id, translationId, bookId, String(verse.chapter), String(verse.verse));
        setSavedFavoriteKey(null);
      } else {
        await addFavorite({
          userId: user.id,
          translationId,
          bookId,
          chapter: String(verse.chapter),
          verse: String(verse.verse),
          reference,
          text: verse.text,
        });
        setSavedFavoriteKey(favoriteKey);
      }
    } catch (saveError) {
      setFavoriteError(saveError instanceof Error ? saveError.message : "Unable to update this favorite.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="relative flex max-h-[72vh] min-h-[50vh] flex-col rounded-3xl border border-white/10 bg-white/5 p-5 text-white">
      <div className="flex items-start justify-between gap-4">
        <AnimPanning
          duration={0.8}
          delay={0.2}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <div className="min-w-0">
            <p className="text-[11px] font-medium tracking-[0.16em] text-white/65 sm:text-xs">{reference}</p>
          </div>
        </AnimPanning>
        <AnimPanning
          duration={0.8}
          delay={0.2}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <button
            type="button"
            onClick={handleFavorite}
            disabled={!isAuthReady || !verse || isSaving}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Remove verse from favorites" : "Add verse to favorites"}
            className="cursor-pointer rounded-full border border-white/15 bg-black/20 px-3 py-2 text-xs font-medium text-white/80 transition hover:border-white/25 hover:bg-white/10 disabled:cursor-not-allowed"
          >
            {isSaving ? "SAVING..." : isFavorite ? "FAVORITED" : "FAVORITE"}
          </button>
        </AnimPanning>
      </div>

      {favoriteError ? <p role="alert" className="mt-2 text-right text-xs text-red-300">{favoriteError}</p> : null}
      <AnimPanning
        duration={0.8}
        delay={0.4}
        direction="up"
        from={0}
        to={0}
        fade="in"
        animOnce={true}
        onScroll={false}
      >
        <div className="flex flex-1 items-center justify-center py-5 sm:py-7">
          <p className="max-h-[14rem] max-w-4xl overflow-y-auto px-2 text-center text-lg leading-relaxed text-white sm:text-xl lg:text-2xl theme-accent">
            {verse?.text ?? "Select a verse to preview it here."}
          </p>
        </div>
      </AnimPanning>
    </section>
  );
}

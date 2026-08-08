"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getFavorites, removeFavorite } from "../../../lib/api/favorites";
import { routes } from "../../../lib/constants/routes";
import type { FavoriteVerse } from "../../../lib/types/favorites";
import { useAuth } from "../auth/AuthProvider";
import AnimPanning from "../gsap/AnimPanning";

export default function FavoritesList() {
  const router = useRouter();
  const { user, isAuthReady } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteVerse[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthReady) return;

    if (!user) {
      router.replace(`${routes.login}?next=${routes.favorites}`);
      return;
    }

    let isCurrent = true;

    getFavorites(user.id)
      .then((items) => {
        if (isCurrent) setFavorites(items);
      })
      .catch((loadError: unknown) => {
        if (isCurrent) {
          setError(loadError instanceof Error ? loadError.message : "Unable to load favorites.");
        }
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [isAuthReady, router, user]);

  async function handleRemove(favorite: FavoriteVerse) {
    setError("");

    try {
      await removeFavorite(
        favorite.userId,
        favorite.translationId,
        favorite.bookId,
        favorite.chapter,
        favorite.verse,
      );
      setFavorites((items) => items.filter((item) => item !== favorite));
    } catch (removeError) {
      setError(removeError instanceof Error ? removeError.message : "Unable to remove favorite.");
    }
  }

  if (!isAuthReady || !user || isLoading) {
    return <p role="status" className="py-16 text-center text-sm text-white/60">LOADING FAVORITES...</p>;
  }

  return (
    <section aria-labelledby="favorites-heading" className="py-10">
      <div className="mb-8">
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
          <h1 id="favorites-heading" className="mt-2 text-3xl font-semibold text-white sm:text-4xl theme-accent">Favorite verses</h1>
        </AnimPanning>
      </div>

      {error ? <p role="alert" className="mb-6 rounded-xl border border-red-300/20 bg-red-300/10 p-4 text-sm text-red-200">{error}</p> : null}

      {favorites.length === 0 ? (
        <AnimPanning
          duration={0.8}
          delay={0.2}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="text-white/70">You have not saved any verses yet.</p>
            <Link href={routes.home} className="mt-4 inline-block font-semibold theme-accent hover:underline">EXPLORE SCRIPTURE</Link>
          </div>
        </AnimPanning>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((favorite, index) => (

            <article key={`${favorite.translationId}-${favorite.bookId}-${favorite.chapter}-${favorite.verse}`}>
              <AnimPanning
                duration={0.8}
                key={`${favorite.translationId}-${favorite.bookId}-${favorite.chapter}-${favorite.verse}-anim-${index}`}
                delay={0.2 + index * 0.1}
                direction="up"
                from={0}
                to={0}
                fade="in"
                animOnce={true}
                onScroll={false}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-semibold tracking-[0.15em] theme-accent">{favorite.reference.toUpperCase()}</p>
                  <p className="shrink-0 rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
                    {favorite.translationId}
                  </p>
                </div>
                <p className="mt-4 flex-1 leading-relaxed text-white/85">{favorite.text.trim()}</p>
                <div className="mt-5 flex items-center justify-between gap-4">
                  <Link href={`/${favorite.translationId}/${favorite.bookId}/${favorite.chapter}`} className="text-xs font-semibold text-white/65 hover:text-white">OPEN CHAPTER</Link>
                  <button type="button" onClick={() => handleRemove(favorite)} className="cursor-pointer text-xs font-semibold text-red-200 hover:text-red-100">REMOVE</button>
                </div>
              </AnimPanning>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

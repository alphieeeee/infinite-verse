import { getRandomPassage, getTranslations } from "../lib/api/bible-api";
import HomeHeroVerse from "./components/hero/HomeHeroVerse";
import TranslationGallery from "./components/gallery/TranslationGallery";
import AnimPanning from "./components/gsap/AnimPanning";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [verse, translationsResponse] = await Promise.all([getRandomPassage(), getTranslations()]);
  const translations = translationsResponse?.translations ?? [];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-4 pb-8 sm:px-6 lg:px-8 lg:pb-10">
      <HomeHeroVerse verse={verse} />

      <section
        aria-labelledby="beginner-guide-title"
        className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 text-white/80 shadow-sm sm:p-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]"
      >
        <div className="max-w-2xl">
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
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">
              How to begin
            </p>
          </AnimPanning>
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
            <h2 id="beginner-guide-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl theme-accent">
              Pick a translation, then step through books and chapters at your own pace.
            </h2>
          </AnimPanning>
          <AnimPanning
            duration={0.8}
            delay={0.6}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <p className="mt-3 text-sm leading-6 text-white/72 sm:text-base">
              Infinite Verse is designed to keep the first reading step simple, calm, and easy to revisit.
            </p>
          </AnimPanning>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
          <AnimPanning
            duration={0.4}
            delay={0.2}
            direction="right"
            from={-4}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
            <p className="text-sm font-medium text-white">Good starting points</p>
          </AnimPanning>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-white/70">
            <li>
              <AnimPanning
                duration={0.4}
                delay={0.4}
                direction="right"
                from={-4}
                to={0}
                fade="in"
                animOnce={true}
                onScroll={false}
              >
                • Read the random verse.
              </AnimPanning>
            </li>
            <li>
              <AnimPanning
                duration={0.4}
                delay={0.6}
                direction="right"
                from={-4}
                to={0}
                fade="in"
                animOnce={true}
                onScroll={false}
              >
                • Choose a translation to continue.
              </AnimPanning>
              </li>
            <li>
              <AnimPanning
                duration={0.4}
                delay={0.8}
                direction="right"
                from={-4}
                to={0}
                fade="in"
                animOnce={true}
                onScroll={false}
              >
                • Move into books, chapters, and verses from there.
              </AnimPanning>
            </li>
          </ul>
        </div>
      </section>

      <TranslationGallery translations={translations} />
    </main>
  );
}

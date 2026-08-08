import type { BibleApiRandomResponse } from "../../../lib/types/bible";
import AnimPanning from "../gsap/AnimPanning";

type HomeHeroVerseProps = {
  verse: BibleApiRandomResponse | null;
};

export default function HomeHeroVerse({ verse }: HomeHeroVerseProps) {
  const randomVerse = verse?.random_verse;
  return (
    <section
      aria-labelledby="home-hero-title"
      className="flex min-h-[50vh] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-md sm:p-8 lg:p-10"
    >
      <h1 id="home-hero-title" className="sr-only">Infinite Verse daily Scripture</h1>

      <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 sm:p-6 flex-1">
          <AnimPanning
            duration={0.4}
            delay={0.2}
            direction="up"
            from={0}
            to={0}
            fade="in"
            animOnce={true}
            onScroll={false}
          >
          <p className="text-sm font-semibold uppercase tracking-[0.3em]">
            Let Scripture Find You.
          </p>
        </AnimPanning>
        <AnimPanning
          duration={0.4}
          delay={0.4}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <blockquote className="mt-4">
            <p className="text-2xl leading-snug text-white sm:text-3xl theme-accent">
              {randomVerse?.text ?? "For God so loved the world, that he gave his only born Son, that whoever believes in him should not perish, but have eternal life."}
            </p>
          </blockquote>
        </AnimPanning>
        <AnimPanning
          duration={0.4}
          delay={0.6}
          direction="up"
          from={0}
          to={0}
          fade="in"
          animOnce={true}
          onScroll={false}
        >
          <p className="mt-4 text-sm font-medium text-white/72">
            {randomVerse ? `${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse}` : "John 3:16"}
          </p>
        </AnimPanning>
      </div>
    </section>
  );
}

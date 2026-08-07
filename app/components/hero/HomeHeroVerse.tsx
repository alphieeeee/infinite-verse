import type { BibleApiRandomResponse } from "../../../lib/types/bible";

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
      {/* <div className="max-w-3xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] theme-accent-soft">
          Random Verse
        </p>
        <h1
          id="home-hero-title"
          className="text-3xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Start with one verse, then explore the rest.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/78 sm:text-lg">
          A calm, beginner-friendly Bible reading experience that helps you begin with a single passage.
        </p>
      </div> */}

      <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 sm:p-6 flex-1">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]">
          {/* {verse?.translation.name ?? "World English Bible"} */}
          Let Scripture Find You.
        </p>
        <blockquote className="mt-4">
          <p className="text-2xl leading-snug text-white sm:text-3xl theme-accent">
            {randomVerse?.text ?? "For God so loved the world, that he gave his only born Son, that whoever believes in him should not perish, but have eternal life."}
          </p>
        </blockquote>
        <p className="mt-4 text-sm font-medium text-white/72">
          {randomVerse ? `${randomVerse.book} ${randomVerse.chapter}:${randomVerse.verse}` : "John 3:16"}
        </p>
      </div>
    </section>
  );
}

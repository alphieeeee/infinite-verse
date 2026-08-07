import Link from "next/link";
import type { BibleApiTranslation } from "../../../lib/types/bible";
import { buildRoute } from "../../../lib/helpers/buildRoute";

type TranslationGalleryProps = {
  translations: BibleApiTranslation[];
};

export default function TranslationGallery({ translations }: TranslationGalleryProps) {
  return (
    <section aria-labelledby="translations-title" className="space-y-5">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] theme-accent-soft">
          Choose a translation
        </p>
        {/* <h2 id="translations-title" className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
          Find a translation that feels comfortable to read.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/72 sm:text-base">
          Start with a familiar translation, then move into books, chapters, and verses at your own pace.
        </p> */}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {translations.map((translation) => (
          <Link
            key={translation.identifier}
            href={buildRoute(translation.identifier)}
            className="group rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-white shadow-sm transition hover:-translate-y-0.5 theme-accent-border theme-accent-border-hover hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 theme-accent-focus"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
                  {translation.identifier}
                </p>
                <h3 className="mt-2 text-md font-semibold theme-accent">{translation.name}</h3>
              </div>
              <span
                aria-hidden="true"
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60 transition group-hover:border-white/20 group-hover:text-white"
              >
                View
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/72">
              {translation.language} {translation.license ? `• ${translation.license}` : ""}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

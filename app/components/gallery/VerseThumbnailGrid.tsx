export default function VerseThumbnailGrid({ verses }: { verses: Array<{ verse: number; text: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {verses.map((verse) => (
        <article key={verse.verse} className="rounded-xl border border-white/10 bg-white/5 p-4 text-white">
          <h3 className="font-semibold">Verse {verse.verse}</h3>
          <p className="mt-2 text-sm text-white/70">{verse.text}</p>
        </article>
      ))}
    </div>
  );
}

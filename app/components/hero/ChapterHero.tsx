export default function ChapterHero({ bookId, chapter }: { bookId: string; chapter: string }) {
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">{bookId.toUpperCase()} {chapter}</section>;
}

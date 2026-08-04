export default function BookHero({ translationId }: { translationId: string }) {
  return <section className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white">Books for {translationId.toUpperCase()}</section>;
}

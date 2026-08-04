export default function EmptyState({ title }: { title: string }) {
  return <div className="rounded-2xl border border-dashed border-white/20 p-6 text-center text-white/70">{title}</div>;
}

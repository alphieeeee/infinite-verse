export default function PaginationDots() {
  return <div className="flex gap-2">{[0, 1, 2].map((dot) => <span key={dot} className="h-2 w-2 rounded-full bg-white/40" />)}</div>;
}

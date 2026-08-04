export default function ErrorState({ message }: { message: string }) {
  return <div className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-center text-red-100">{message}</div>;
}

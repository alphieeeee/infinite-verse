export function buildRoute(translationId: string, bookId?: string, chapter?: string) {
  if (!bookId) return `/${translationId}`;
  if (!chapter) return `/${translationId}/${bookId}`;
  return `/${translationId}/${bookId}/${chapter}`;
}

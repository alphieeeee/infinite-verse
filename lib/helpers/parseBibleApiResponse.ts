import type { BibleApiRandomResponse } from "../types/bible";

export function parseBibleApiResponse(data: BibleApiRandomResponse | null) {
  if (!data) return null;
  return {
    reference: `${data.random_verse.book} ${data.random_verse.chapter}:${data.random_verse.verse}`,
    text: data.random_verse.text,
    translationId: data.translation.identifier,
    translationName: data.translation.name,
  };
}

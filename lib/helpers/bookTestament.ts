import type { BibleApiBook } from "../types/bible";

const OLD_TESTAMENT_BOOK_IDS = new Set([
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
]);

const NEW_TESTAMENT_BOOK_IDS = new Set([
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
]);

export type Testament = "old" | "new";

export function getBookTestament(book: BibleApiBook): Testament | null {
  const normalizedId = book.id.toUpperCase();

  if (OLD_TESTAMENT_BOOK_IDS.has(normalizedId)) return "old";
  if (NEW_TESTAMENT_BOOK_IDS.has(normalizedId)) return "new";
  return null;
}

export function filterBooksByTestament(books: BibleApiBook[], testament: Testament) {
  return books.filter((book) => getBookTestament(book) === testament);
}

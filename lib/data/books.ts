export type Book = {
  id: string;
  name: string;
  testament: "old" | "new";
  chapters: number;
};

export const books: Book[] = [
  { id: "genesis", name: "Genesis", testament: "old", chapters: 50 },
  { id: "exodus", name: "Exodus", testament: "old", chapters: 40 },
  { id: "john", name: "John", testament: "new", chapters: 21 },
  { id: "romans", name: "Romans", testament: "new", chapters: 16 },
];

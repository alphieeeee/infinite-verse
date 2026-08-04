export type Translation = {
  id: string;
  name: string;
  description: string;
};

export const translations: Translation[] = [
  {
    id: "web",
    name: "World English Bible",
    description: "A clear, public-domain translation for easy reading.",
  },
  {
    id: "kjv",
    name: "King James Version",
    description: "Classic English translation with historic language.",
  },
];

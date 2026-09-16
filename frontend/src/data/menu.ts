import type { CategoryId, MenuItem, MenuCategory } from "./types";

export interface CategoryOption {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: CategoryOption[] = [
  { id: "all", label: "All" },
  { id: "espresso", label: "Espresso" },
  { id: "cold-brew", label: "Cold Brew" },
  { id: "pastries", label: "Pastries" },
];

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  espresso: "Espresso",
  "cold-brew": "Cold Brew",
  pastries: "Pastries",
};

export const MENU: MenuItem[] = [
  {
    id: "classic-americano",
    name: "Classic Americano",
    description: "Double-shot espresso topped with hot water and a clean finish.",
    pricephp: 120.0,
    category: "espresso",
    image: "/img/espresso.svg",
  },
  {
    id: "signature-cafe-latte",
    name: "Signature Caf\u00e9 Latte",
    description: "Velvety steamed milk poured over a rich double shot.",
    pricephp: 150.0,
    category: "espresso",
    image: "/img/latte.svg",
  },
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    description: "Espresso, caramel drizzle and silky foam. Sweet and bold.",
    pricephp: 165.0,
    category: "espresso",
    image: "/img/macchiato.svg",
  },
  {
    id: "house-cold-brew",
    name: "House Cold Brew",
    description: "18-hour slow-steeped cold brew served over ice.",
    pricephp: 130.0,
    category: "cold-brew",
    image: "/img/coldbrew.svg",
  },
  {
    id: "iced-spanish-latte",
    name: "Iced Spanish Latte",
    description: "Double shot, condensed milk and cold milk over ice.",
    pricephp: 160.0,
    category: "cold-brew",
    image: "/img/iced-latte.svg",
  },
  {
    id: "butter-croissant",
    name: "Butter Croissant",
    description: "Flaky, golden and baked fresh every morning.",
    pricephp: 110.0,
    category: "pastries",
    image: "/img/croissant.svg",
  },
  {
    id: "cheese-cinnamon-roll",
    name: "Cheese Cinnamon Roll",
    description: "Cream-cheese glaze with a sprinkle of cinnamon sugar.",
    pricephp: 140.0,
    category: "pastries",
    image: "/img/cinnamon.svg",
  },
];
export type MenuCategory = "espresso" | "cold-brew" | "pastries";

export type CategoryId = "all" | MenuCategory;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  pricephp: number;
  category: MenuCategory;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}
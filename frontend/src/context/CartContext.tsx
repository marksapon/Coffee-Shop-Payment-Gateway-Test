"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, MenuItem } from "@/data/types";
import { computeTotals, type OrderTotals } from "@/lib/order";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totals: OrderTotals;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItem) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.menuItem.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.menuItem.id === item.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }
      return [...prev, { menuItem: item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.menuItem.id !== id));
  }, []);

  const increment = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.menuItem.id === id ? { ...entry, quantity: entry.quantity + 1 } : entry,
      ),
    );
  }, []);

  const decrement = useCallback((id: string) => {
    setItems((prev) =>
      prev.map((entry) =>
        entry.menuItem.id === id
          ? { ...entry, quantity: Math.max(1, entry.quantity - 1) }
          : entry,
      ),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const itemCount = useMemo(
    () => items.reduce((sum, entry) => sum + entry.quantity, 0),
    [items],
  );

  const totals = useMemo(() => computeTotals(items), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount,
      totals,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      increment,
      decrement,
      clear,
    }),
    [
      items,
      itemCount,
      totals,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      increment,
      decrement,
      clear,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
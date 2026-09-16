import type { CartItem } from "@/data/types";
import { CONVENIENCE_FEE_PHP, TAX_RATE } from "./config";
import { round2 } from "./format";

export interface OrderTotals {
  subtotal: number;
  serviceFee: number;
  tax: number;
  grandTotal: number;
}

export function computeTotals(items: CartItem[]): OrderTotals {
  const subtotal = round2(
    items.reduce((sum, entry) => sum + entry.menuItem.pricephp * entry.quantity, 0),
  );
  const serviceFee = subtotal > 0 ? CONVENIENCE_FEE_PHP : 0;
  const tax = round2(subtotal * TAX_RATE);
  const grandTotal = round2(subtotal + serviceFee + tax);
  return { subtotal, serviceFee, tax, grandTotal };
}

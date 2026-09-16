import type { CartItem } from "@/data/types";
import { toCents } from "@/lib/format";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3210";

interface BackendSessionResponse {
  session_id: string;
  payment_url: string;
  status: string;
}

export async function createPaymentSessionViaBackend(
  items: CartItem[],
  grandTotal: number,
): Promise<BackendSessionResponse> {
  const sessionItems = items.map((entry) => ({
    reference_id: entry.menuItem.id,
    name: entry.menuItem.name,
    quantity: entry.quantity,
    price: toCents(entry.menuItem.pricephp),
    category: "FOOD_AND_BEVERAGE",
  }));

  const description = items
    .map((entry) => `${entry.quantity} x ${entry.menuItem.name}`)
    .join(", ");

  const response = await fetch(`${BACKEND_URL}/api/payment/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: toCents(grandTotal),
      currency: "PHP",
      description,
      reference_id: `coffee-${Date.now()}`,
      items: sessionItems,
      success_return_url: `${window.location.origin}/payment/success`,
      cancel_return_url: `${window.location.origin}/payment/cancel`,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create payment session");
  }

  return data;
}

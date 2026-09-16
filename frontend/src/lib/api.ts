import type { CartItem } from "@/data/types";
import { toCents } from "@/lib/format";

interface CreateSessionResponse {
  payment_session_id: string;
  payment_link_url: string;
  status: string;
}

export async function createPaymentSession(
  items: CartItem[],
  grandTotal: number,
): Promise<CreateSessionResponse> {
  const sessionItems = items.map((entry) => ({
    reference_id: entry.menuItem.id,
    name: entry.menuItem.name,
    net_unit_amount: toCents(entry.menuItem.pricephp),
    quantity: entry.quantity,
    category: "FOOD_AND_BEVERAGE",
  }));

  const description = items
    .map((entry) => `${entry.quantity} x ${entry.menuItem.name}`)
    .join(", ");

  const response = await fetch("/api/sessions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: toCents(grandTotal),
      items: sessionItems,
      description,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create payment session");
  }

  return data;
}

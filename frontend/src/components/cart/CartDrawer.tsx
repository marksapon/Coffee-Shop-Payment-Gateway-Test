"use client";

import { useState } from "react";
import { ArrowRight, Loader2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { createPaymentSession } from "@/lib/api";
import { showToast } from "@/hooks/useToast";
import CartItemRow from "./CartItemRow";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";

export default function CartDrawer() {
  const { items, totals, isCartOpen, closeCart, clear } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const { payment_link_url } = await createPaymentSession(
        items,
        totals.grandTotal,
      );
      clear();
      window.location.href = payment_link_url;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create payment session";
      showToast(message, "error");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-espresso/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping cart"
        aria-hidden={!isCartOpen}
        className={`fixed inset-y-0 right-0 z-[65] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[28rem] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-espresso">Your Order</h2>
          <button
            onClick={closeCart}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-mocha transition hover:bg-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <EmptyCart />
          ) : (
            <ul className="divide-y divide-espresso/10">
              {items.map((entry) => (
                <CartItemRow key={entry.menuItem.id} entry={entry} />
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-espresso/10 bg-cream/60 px-5 py-4">
            <CartSummary totals={totals} />
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-caramel to-latte font-semibold text-espresso shadow-md transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-espresso disabled:opacity-60 disabled:hover:brightness-100"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

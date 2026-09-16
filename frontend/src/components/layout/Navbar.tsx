"use client";

import { Coffee } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-espresso/95 text-cream shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-latte/20 ring-1 ring-latte/40">
            <Coffee className="h-5 w-5 text-caramel" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold leading-none">Xendit Coffee</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-latte/80">
              Payments Sandbox
            </p>
          </div>
        </div>
        <CartBadge count={itemCount} onClick={openCart} />
      </div>
    </header>
  );
}
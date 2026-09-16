"use client";

import { ShoppingBag } from "lucide-react";

export default function CartBadge({
  count,
  onClick,
}: {
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex h-11 items-center gap-2 rounded-xl bg-latte/15 px-4 text-sm font-semibold text-cream ring-1 ring-latte/30 transition hover:bg-latte/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel"
      aria-label={`Open cart. ${count} item${count === 1 ? "" : "s"}.`}
    >
      <ShoppingBag className="h-5 w-5 text-caramel transition-transform group-hover:-rotate-6" />
      <span className="hidden sm:inline">Cart</span>
      <span
        key={count}
        className="inline-flex h-6 min-w-6 animate-[badge-pop_0.25s_ease-out] items-center justify-center rounded-full bg-caramel px-1.5 text-xs font-bold text-espresso"
      >
        {count}
      </span>
    </button>
  );
}
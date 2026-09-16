import { BaggageClaim } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="flex h-full flex-col items-center justify-center py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-cream ring-1 ring-espresso/10">
        <BaggageClaim className="h-8 w-8 text-caramel" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-espresso">Your cart is empty</h3>
      <p className="mt-1 max-w-xs text-sm leading-relaxed text-mocha">
        Add a brew or a pastry to get started on your test order.
      </p>
    </div>
  );
}
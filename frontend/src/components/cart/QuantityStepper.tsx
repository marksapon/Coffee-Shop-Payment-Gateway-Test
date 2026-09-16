import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
}: {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className="mt-2 inline-flex items-center rounded-full ring-1 ring-espresso/15">
      <button
        onClick={onDecrement}
        disabled={quantity <= 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-l-full text-espresso transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-semibold tabular-nums text-espresso">
        {quantity}
      </span>
      <button
        onClick={onIncrement}
        className="inline-flex h-8 w-8 items-center justify-center rounded-r-full text-espresso transition hover:bg-cream"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
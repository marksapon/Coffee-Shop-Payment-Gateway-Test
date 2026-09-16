import { Trash2 } from "lucide-react";
import type { CartItem } from "@/data/types";
import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/ui/PriceTag";
import QuantityStepper from "./QuantityStepper";

export default function CartItemRow({ entry }: { entry: CartItem }) {
  const { increment, decrement, removeItem } = useCart();
  const { menuItem, quantity } = entry;

  return (
    <li className="flex items-center gap-3 py-4">
      <div className="flex flex-1 flex-col">
        <h3 className="truncate font-semibold text-espresso">{menuItem.name}</h3>
        <QuantityStepper
          quantity={quantity}
          onIncrement={() => increment(menuItem.id)}
          onDecrement={() => decrement(menuItem.id)}
        />
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <PriceTag
          amount={menuItem.pricephp * quantity}
          className="text-sm font-semibold text-espresso"
        />
        <button
          onClick={() => removeItem(menuItem.id)}
          className="inline-flex items-center gap-1 text-xs font-medium text-mocha/80 transition hover:text-danger"
          aria-label={`Remove ${menuItem.name} from order`}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Remove
        </button>
      </div>
    </li>
  );
}
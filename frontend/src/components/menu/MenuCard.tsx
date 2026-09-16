import { Check, Plus } from "lucide-react";
import { useState } from "react";
import type { MenuItem } from "@/data/types";
import { useCart } from "@/context/CartContext";
import PriceTag from "@/components/ui/PriceTag";
import ProductImage from "./ProductImage";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-espresso/10 transition hover:-translate-y-0.5 hover:shadow-lg">
      <ProductImage category={item.category} name={item.name} />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-espresso">{item.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-mocha">{item.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <PriceTag
            amount={item.pricephp}
            className="text-lg font-semibold text-espresso"
          />
          <button
            onClick={handleAdd}
            aria-label={`Add ${item.name} to order`}
            className={`inline-flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel ${
              added
                ? "bg-caramel text-espresso"
                : "bg-espresso text-cream hover:bg-latte hover:text-espresso"
            }`}
          >
            {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {added ? "Added" : "Add to Order"}
          </button>
        </div>
      </div>
    </article>
  );
}
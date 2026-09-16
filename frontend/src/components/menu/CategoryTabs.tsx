import { CATEGORIES } from "@/data/menu";
import type { CategoryId } from "@/data/types";

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: CategoryId;
  onChange: (id: CategoryId) => void;
}) {
  return (
    <div role="tablist" aria-label="Filter menu by category" className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => {
        const selected = category.id === active;
        return (
          <button
            key={category.id}
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(category.id)}
            className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel ${
              selected
                ? "bg-latte text-espresso shadow-sm"
                : "bg-cream text-mocha ring-1 ring-mocha/20 hover:bg-caramel/30 hover:text-espresso"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
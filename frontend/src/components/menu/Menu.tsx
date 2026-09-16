"use client";

import { useMemo, useState } from "react";
import { MENU } from "@/data/menu";
import type { CategoryId } from "@/data/types";
import CategoryTabs from "./CategoryTabs";
import MenuCard from "./MenuCard";

export default function Menu() {
  const [active, setActive] = useState<CategoryId>("all");

  const filtered = useMemo(
    () => (active === "all" ? MENU : MENU.filter((item) => item.category === active)),
    [active],
  );

  return (
    <section aria-label="Menu">
      <CategoryTabs active={active} onChange={setActive} />
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-16 text-center text-mocha">No items in this category right now.</p>
      )}
    </section>
  );
}
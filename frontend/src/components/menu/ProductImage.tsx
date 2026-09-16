import { Coffee, Croissant, CupSoda } from "lucide-react";
import type { MenuCategory } from "@/data/types";
import { CATEGORY_LABELS } from "@/data/menu";

const STYLES: Record<
  MenuCategory,
  { gradient: string; icon: typeof Coffee; tint: string }
> = {
  espresso: {
    gradient: "from-[#3a2212] via-[#4a2c18] to-[#2e1a0e]",
    icon: Coffee,
    tint: "text-caramel",
  },
  "cold-brew": {
    gradient: "from-[#6b4a2a] via-[#503620] to-[#3a2212]",
    icon: CupSoda,
    tint: "text-latte",
  },
  pastries: {
    gradient: "from-[#d9a86c] via-[#c98d4b] to-[#b0763a]",
    icon: Croissant,
    tint: "text-cream",
  },
};

export default function ProductImage({
  category,
  name,
}: {
  category: MenuCategory;
  name: string;
}) {
  const style = STYLES[category];
  const Icon = style.icon;

  return (
    <div
      role="img"
      aria-label={`${name} placeholder image`}
      className={`relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br ${style.gradient}`}
    >
      <Icon
        className={`h-12 w-12 opacity-90 drop-shadow transition-transform duration-300 group-hover:scale-110 ${style.tint}`}
        strokeWidth={1.5}
      />
      <span className="absolute bottom-2 right-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {CATEGORY_LABELS[category]}
      </span>
    </div>
  );
}
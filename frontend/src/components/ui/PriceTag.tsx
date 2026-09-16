import { formatPHP } from "@/lib/format";

export default function PriceTag({
  amount,
  className = "",
}: {
  amount: number;
  className?: string;
}) {
  return (
    <span className={`font-mono tabular-nums ${className}`}>{formatPHP(amount)}</span>
  );
}
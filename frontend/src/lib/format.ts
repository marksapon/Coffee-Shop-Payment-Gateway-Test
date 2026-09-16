const phpFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatPHP(amount: number): string {
  return phpFormatter.format(amount);
}

export function toCents(php: number): number {
  return Math.round(php * 100);
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export { round2 };
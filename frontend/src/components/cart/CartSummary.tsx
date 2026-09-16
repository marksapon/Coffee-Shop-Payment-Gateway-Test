import type { OrderTotals } from "@/lib/order";
import PriceTag from "@/components/ui/PriceTag";

export default function CartSummary({ totals }: { totals: OrderTotals }) {
  return (
    <dl className="space-y-2 text-sm">
      <div className="flex justify-between text-mocha">
        <dt>Subtotal</dt>
        <dd>
          <PriceTag amount={totals.subtotal} />
        </dd>
      </div>
      <div className="flex justify-between text-mocha">
        <dt>Service Fee</dt>
        <dd>
          <PriceTag amount={totals.serviceFee} />
        </dd>
      </div>
      <div className="flex justify-between text-mocha">
        <dt>VAT (12%)</dt>
        <dd>
          <PriceTag amount={totals.tax} />
        </dd>
      </div>
      <div className="flex justify-between border-t border-espresso/10 pt-2 text-base font-semibold text-espresso">
        <dt>Grand Total</dt>
        <dd>
          <PriceTag amount={totals.grandTotal} className="text-lg font-bold" />
        </dd>
      </div>
    </dl>
  );
}
import { formatCurrency } from "../utils/currency.js";

export default function OrderSummary({ totalQuantity, totalPrice }) {
  return (
    <>
      <h3>Order Summary</h3>
      {/* Announces updated totals to screen readers after each addition */}
      <dl aria-live="polite" aria-atomic="true">
        <dt>Total quantity</dt>
        <dd>{totalQuantity}</dd>
        <dt>Total price</dt>
        <dd>{formatCurrency(totalPrice)}</dd>
      </dl>
    </>
  );
}

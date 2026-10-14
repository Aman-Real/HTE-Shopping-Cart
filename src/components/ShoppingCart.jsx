import { useId } from "react";
import CartItem from "./CartItem.jsx";
import OrderSummary from "./OrderSummary.jsx";

export default function ShoppingCart({ items, totalQuantity, totalPrice }) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Shopping Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Unit Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      )}

      <OrderSummary totalQuantity={totalQuantity} totalPrice={totalPrice} />
    </section>
  );
}

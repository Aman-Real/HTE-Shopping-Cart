import { useId } from "react";
import { formatCurrency } from "../utils/currency.js";

export default function ProductItem({ product, onAddToCart }) {
  const id = useId();
  const nameId = `${id}-name`;
  const buttonId = `${id}-button`;

  return (
    <article>
      <h3 id={nameId}>{product.name}</h3>
      <p>Unit price: {formatCurrency(product.price)}</p>
      {/* Accessible name: "Add to Cart <product name>" */}
      <button
        type="button"
        id={buttonId}
        aria-labelledby={`${buttonId} ${nameId}`}
        onClick={() => onAddToCart(product)}
      >
        Add to Cart
      </button>
    </article>
  );
}

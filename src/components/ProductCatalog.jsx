import { useId } from "react";
import ProductItem from "./ProductItem.jsx";

export default function ProductCatalog({ products, onAddToCart }) {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId}>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <ProductItem product={product} onAddToCart={onAddToCart} />
          </li>
        ))}
      </ul>
    </section>
  );
}

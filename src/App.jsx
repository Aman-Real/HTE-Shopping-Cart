import { useState } from "react";
import ProductCatalog from "./components/ProductCatalog.jsx";
import ShoppingCart from "./components/ShoppingCart.jsx";
import { products } from "./data/products.js";
import { addItemToCart, getCartSummary } from "./utils/cart.js";

export default function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((previousCart) => addItemToCart(previousCart, product));
  };

  const { totalQuantity, totalPrice } = getCartSummary(cart);

  return (
    <main>
      <h1>HTE Laboratory Supply</h1>
      <ProductCatalog products={products} onAddToCart={handleAddToCart} />
      <ShoppingCart
        items={cart}
        totalQuantity={totalQuantity}
        totalPrice={totalPrice}
      />
    </main>
  );
}

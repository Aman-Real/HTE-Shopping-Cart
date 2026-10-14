export function addItemToCart(cart, product) {
  const isInCart = cart.some((item) => item.id === product.id);

  if (!isInCart) {
    const { id, name, price } = product;
    return [...cart, { id, name, price, quantity: 1 }];
  }

  return cart.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  );
}

export function getItemSubtotal(item) {
  return item.price * item.quantity;
}

export function getCartSummary(cart) {
  return cart.reduce(
    (summary, item) => ({
      totalQuantity: summary.totalQuantity + item.quantity,
      totalPrice: summary.totalPrice + getItemSubtotal(item),
    }),
    { totalQuantity: 0, totalPrice: 0 }
  );
}

import { describe, expect, it } from "vitest";
import { products } from "../data/products.js";
import { addItemToCart, getCartSummary, getItemSubtotal } from "./cart.js";
import { formatCurrency } from "./currency.js";

const [glassPlate, polypropylenePlate] = products;

describe("addItemToCart", () => {
  it("adds a new product with quantity 1", () => {
    expect(addItemToCart([], glassPlate)).toEqual([
      { id: "hte_96g", name: "96-Well Glass-Lined Plate", price: 45.5, quantity: 1 },
    ]);
  });

  it("increments quantity instead of creating a duplicate entry", () => {
    let cart = [];
    for (let click = 0; click < 3; click++) cart = addItemToCart(cart, glassPlate);

    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(3);
    expect(getItemSubtotal(cart[0])).toBe(136.5);
  });

  it("adds a different product as a separate entry", () => {
    const cart = addItemToCart(addItemToCart([], glassPlate), polypropylenePlate);
    expect(cart.map((item) => item.id)).toEqual(["hte_96g", "hte_384p"]);
  });

  it("never mutates the previous cart", () => {
    const previousCart = Object.freeze([Object.freeze({ ...glassPlate, quantity: 1 })]);
    const nextCart = addItemToCart(previousCart, glassPlate);

    expect(previousCart[0].quantity).toBe(1);
    expect(nextCart).not.toBe(previousCart);
    expect(nextCart[0]).not.toBe(previousCart[0]);
  });
});

describe("getCartSummary", () => {
  it("returns zero totals for an empty cart", () => {
    expect(getCartSummary([])).toEqual({ totalQuantity: 0, totalPrice: 0 });
  });

  it("sums quantities and subtotals across entries", () => {
    const cart = [
      { ...glassPlate, quantity: 2 },
      { ...polypropylenePlate, quantity: 3 },
    ];
    expect(getCartSummary(cart)).toEqual({ totalQuantity: 5, totalPrice: 157 });
  });
});

describe("formatCurrency", () => {
  it("always shows two decimal places in USD", () => {
    expect(formatCurrency(45.5)).toBe("$45.50");
    expect(formatCurrency(157)).toBe("$157.00");
    expect(formatCurrency(0)).toBe("$0.00");
  });
});

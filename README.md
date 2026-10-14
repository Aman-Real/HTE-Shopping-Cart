# HTE Laboratory Supply — Shopping Cart

A small React app for a laboratory supply store that sells High-Throughput Experimentation (HTE) plates. You can browse the plate catalog, add plates to a cart, and see each item's subtotal and an order summary that update with every click.

The project is an exercise in React fundamentals: functional components, Hooks, immutable state updates, derived calculations, and accessible markup. Styling is intentionally out of scope.

## Features

- Catalog of four HTE plates, rendered from a data file
- **Add to Cart** adds a plate with quantity 1, or increases the quantity of the existing entry instead of creating a duplicate
- Cart table showing the unit price, quantity, and subtotal for each item
- Order summary with total quantity and total price, calculated from the cart state
- Currency formatting with `Intl.NumberFormat` (USD by default), set in one place
- Buttons that make sense to screen readers, and totals that are announced when they change

## Tech stack

React 19, Vite 8, Vitest 5, and Oxlint, using plain JavaScript and JSX. There are no state management libraries, UI component kits, cart packages, or CSS.

## Requirements

- Node.js **22.12 or newer** (required by Vitest 5)
- npm

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload          |
| `npm run build`   | Create a production build in `dist/`          |
| `npm run preview` | Serve the production build locally            |
| `npm test`        | Run the unit tests once                       |
| `npm run lint`    | Lint the project with Oxlint                  |

## Project structure

```text
src/
├── components/
│   ├── ProductCatalog.jsx   # Product list section; maps products to ProductItem
│   ├── ProductItem.jsx      # One product: name, price, Add to Cart button
│   ├── ShoppingCart.jsx     # Cart section: empty message or cart table, plus summary
│   ├── CartItem.jsx         # One cart row: name, unit price, quantity, subtotal
│   └── OrderSummary.jsx     # Total quantity and total price
├── data/
│   └── products.js          # Product catalog
├── utils/
│   ├── cart.js              # Pure cart logic: add item, subtotal, summary
│   ├── cart.test.js         # Unit tests for cart logic and currency formatting
│   └── currency.js          # Shared currency formatter
├── App.jsx                  # Owns cart state and wires everything together
└── main.jsx                 # App entry point (StrictMode)
```

## How it works

### Data flow

`App` is the single source of truth. It holds the cart in `useState` and passes data down to the other components:

- `ProductCatalog` → `ProductItem` receive the products and an `onAddToCart` callback.
- `ShoppingCart` → `CartItem` and `OrderSummary` receive the cart items and the calculated totals.

Clicks travel back up through `onAddToCart`. Every component below `App` only displays its props and holds no state of its own.

### State updates

Adding an item always uses a functional update, so each click works from the latest state:

```javascript
setCart((previousCart) => addItemToCart(previousCart, product));
```

`addItemToCart` never changes the existing cart. A new product is added with spread syntax (`[...cart, newItem]`). An existing product is updated with `map()`, which returns a new array with a new object for the changed item only. Because the function is pure, fast repeated clicks and StrictMode's double-run checks in development still produce correct quantities.

### Calculated values

Subtotals and totals are never stored in state. They are calculated from the cart on every render:

- Item subtotal: `price * quantity`
- Summary: a single `reduce()` that adds up quantities and subtotals, starting from `{ totalQuantity: 0, totalPrice: 0 }`, so an empty cart works without special handling

`useMemo` is left out on purpose. The cart is `App`'s only state, so a memoized value would be recalculated on exactly the same renders.

## Accessibility

- The page uses semantic elements: `main`, `section`, `article`, a list for products, and a table for the cart.
- Headings follow a logical order: `h1` → `h2` → `h3`.
- Each button's accessible name combines the button text with the product name, for example "Add to Cart 96-Well Glass-Lined Plate". It starts with the visible text and changes automatically if that text is translated.
- Cart table headers use `scope="col"` and `scope="row"`.
- Order totals sit in a polite live region, so screen readers announce them after each addition.
- All actions are real `<button>` elements, so they work with Tab, Enter, and Space.

## Changing the locale or currency

Edit the two constants in `src/utils/currency.js`:

```javascript
const LOCALE = "en-IN";
const CURRENCY = "INR";
```

This changes only how prices are formatted. It does not convert them: the amounts in `products.js` are still in USD.

## Testing

### Automated

```bash
npm test
```

`src/utils/cart.test.js` checks that:

- A new product is added with quantity 1.
- Adding the same product again increases its quantity instead of creating a duplicate entry.
- Different products get separate entries.
- The previous cart is never modified (frozen-object test).
- An empty cart gives zero totals.
- Totals match the brief's example: 2 × $45.50 + 3 × $22.00 = 5 items, $157.00.
- Prices are always formatted with two decimals.

### Manual checklist

1. On first load, all four products are listed and the cart says "Your cart is empty." with totals of 0 and $0.00.
2. Adding the 96-Well Glass-Lined Plate once shows quantity 1 and a subtotal of $45.50.
3. Adding it twice more keeps a single row, now with quantity 3 and a subtotal of $136.50.
4. Adding a different plate creates a second row.
5. Total quantity and total price match the sums of the table columns.
6. Rapid repeated clicks increase the quantity by exactly the number of clicks.
7. Every amount shows two decimal places.
8. The browser console shows no key warnings or errors.

## Out of scope

As the exercise brief specifies, the app has no backend, authentication, local storage, checkout, payment, search, filtering, or quantity controls.

## Note on prices

All current prices are multiples of $0.25, which floating-point numbers represent exactly, so the totals are exact. If you add prices like $19.99, switch the calculations to integer cents to avoid rounding errors.

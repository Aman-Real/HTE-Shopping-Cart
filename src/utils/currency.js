// Change these two values to localize every price in the app.
const LOCALE = "en-US";
const CURRENCY = "USD";

const currencyFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: CURRENCY,
});

export function formatCurrency(amount) {
  return currencyFormatter.format(amount);
}

import { getItemSubtotal } from "../utils/cart.js";
import { formatCurrency } from "../utils/currency.js";

export default function CartItem({ item }) {
  return (
    <tr>
      <th scope="row">{item.name}</th>
      <td>{formatCurrency(item.price)}</td>
      <td>{item.quantity}</td>
      <td>{formatCurrency(getItemSubtotal(item))}</td>
    </tr>
  );
}

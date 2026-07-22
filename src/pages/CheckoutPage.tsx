import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import styles from "./CheckoutPage.module.css";
function CheckoutPage() {
  const { items } = useCart();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  return (
    <div className={styles.container}>
      <h1>Checkout</h1>

      <div className={styles.summary}>
        <h2>Order Summary</h2>

        {items.map((item) => (
          <div key={item.product.id} className={styles.item}>
            <span>
              {item.product.title} × {item.quantity}
            </span>
            <span>$ {(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className={styles.row}>
          <span>
            <strong>Subtotal</strong>
          </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.row}>
          <span>
            <strong>Shipping</strong>
          </span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className={styles.total}>
          <span>
            <strong>Total</strong>
          </span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link to="/cart">Go back to cart</Link>
    </div>
  );
}

export default CheckoutPage;

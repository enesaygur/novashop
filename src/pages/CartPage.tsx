import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import styles from "./CartPage.module.css";
function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCart();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;
  return (
    <div className={styles.container}>
      <h1>Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className={styles.list}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <img src={item.product.thumbnail} alt={item.product.title} />
              <div>
                <h3>{item.product.title}</h3>
                <p>${item.product.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => decreaseQuantity(item.product.id)}>
                    -
                  </button>
                  <p>Quantity: {item.quantity}</p>
                  <button onClick={() => increaseQuantity(item.product.id)}>
                    +
                  </button>
                </div>
              </div>
              <button type="button" onClick={() => removeItem(item.product.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <div className={styles.summary}>
        <div>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div>
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>

        <div className={styles.total}>
          <strong>Total</strong>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <Link to="/checkout" className={styles.checkoutButton}>
          Checkout
        </Link>
      </div>
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default CartPage;

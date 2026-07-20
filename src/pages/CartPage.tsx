import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import styles from "./CartPage.module.css";
function CartPage() {
  const { items, removeItem } = useCart();
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
                <p>Quantity: {item.quantity}</p>
              </div>
              <button type="button" onClick={() => removeItem(item.product.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default CartPage;

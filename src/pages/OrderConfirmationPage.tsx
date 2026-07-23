import { Link } from "react-router";
import styles from "./OrderConfirmationPage.module.css";
function OrderConfirmationPage() {
  return (
    <div className={styles.container}>
      <h1>Order Confirmed!</h1>
      <p>Thank you for your order</p>
      <p>Your order has been placed successfully</p>
      <Link to="/products">Continue Shopping</Link>
    </div>
  );
}

export default OrderConfirmationPage;

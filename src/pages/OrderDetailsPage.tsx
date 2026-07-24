import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { Order } from "../types/Order";
import { getOrders } from "../utils/orderStorage";
import styles from "./OrderDetailsPage.module.css";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const orders = getOrders();
    const foundOrder = orders.find((order) => order.id === orderId);

    setOrder(foundOrder ?? null);
  }, [orderId]);

  if (!order) {
    return (
      <div className={styles.notFound}>
        <h1>Order not found</h1>
        <Link to="/orders">Go back to orders</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/orders" className={styles.backLink}>
        ← Back to Orders
      </Link>

      <div className={styles.header}>
        <div>
          <h1>Order #{order.id.slice(0, 8)}</h1>

          <p className={styles.date}>
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <h2>Customer Information</h2>

        <div className={styles.customer}>
          <p>{order.customer.fullName}</p>
          <p>{order.customer.email}</p>
          <p>{order.customer.address}</p>
          <p>
            {order.customer.city}, {order.customer.postalCode}
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Products</h2>

        <div className={styles.items}>
          {order.items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <img src={item.product.thumbnail} alt={item.product.title} />

              <div className={styles.itemInfo}>
                <h3>{item.product.title}</h3>

                <p>Quantity: {item.quantity}</p>

                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.summary}>
        <div className={styles.summaryRow}>
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Shipping</span>
          <span>${order.shipping.toFixed(2)}</span>
        </div>

        <div className={styles.total}>
          <strong>Total</strong>
          <strong>${order.total.toFixed(2)}</strong>
        </div>
      </section>
    </div>
  );
}

export default OrderDetailsPage;

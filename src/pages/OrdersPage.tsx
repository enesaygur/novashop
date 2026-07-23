import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { getOrders } from "../utils/orderStorage";
import styles from "./OrdersPage.module.css";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order History</h1>

      {orders.length === 0 ? (
        <p className={styles.empty}>No orders yet.</p>
      ) : (
        <div className={styles.orders}>
          {orders.map((order) => (
            <div key={order.id} className={styles.order}>
              <div className={styles.header}>
                <div>
                  <h2>Order #{order.id.slice(0, 8)}</h2>

                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <strong>${order.total.toFixed(2)}</strong>
              </div>

              <div className={styles.items}>
                {order.items.map((item) => (
                  <div key={item.product.id} className={styles.item}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                    />

                    <div>
                      <h3>{item.product.title}</h3>

                      <p>Quantity: {item.quantity}</p>

                      <p>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.summary}>
                <p>Subtotal: ${order.subtotal.toFixed(2)}</p>

                <p>Shipping: ${order.shipping.toFixed(2)}</p>

                <strong>Total: ${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

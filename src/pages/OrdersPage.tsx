import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { getOrders } from "../utils/orderStorage";
import styles from "./OrdersPage.module.css";
import { Link } from "react-router";
import EmptyState from "../components/common/EmptyState";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order History</h1>

      {orders.length === 0 ? (
        <EmptyState message="You have no orders yet" />
      ) : (
        <div className={styles.orders}>
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className={styles.order}
            >
              <div className={styles.header}>
                <div>
                  <h2>Order #{order.id.slice(0, 8)}</h2>

                  <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>

                <strong>${order.total.toFixed(2)}</strong>
              </div>

              <p>Items: {order.items.length}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersPage;

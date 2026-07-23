import { useEffect, useState } from "react";
import type { Order } from "../types/Order";
import { getOrders } from "../utils/orderStorage";

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(getOrders());
  }, []);
  return (
    <div>
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id}>
            <h2>Order ID: {order.id}</h2>

            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>Total: ${order.total.toFixed(2)}</p>
            <p>Items: {order.items.length}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersPage;

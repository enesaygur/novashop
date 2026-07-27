import { useMemo } from "react";
import { getUsers } from "../context/auth/authStorage";
import { getOrders } from "../utils/orderStorage";
import styles from "./AdminDashboardPage.module.css";
function AdminDashboardPage() {
  const users = getUsers();
  const orders = getOrders();

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    return {
      totalRevenue,
      totalUsers: users.length,
      totalOrders: orders.length,
    };
  }, [users, orders]);

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      <div className={styles.stats}>
        <div className={styles.card}>
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </div>

        <div className={styles.card}>
          <h2>Total Orders</h2>
          <p>{stats.totalOrders}</p>
        </div>

        <div className={styles.card}>
          <h2>Total Revenue</h2>
          <p>${stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;

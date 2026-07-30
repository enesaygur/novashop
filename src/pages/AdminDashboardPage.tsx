import { useMemo } from "react";
import { getUsers } from "../context/auth/authStorage";
import { getOrders } from "../utils/orderStorage";
import styles from "./AdminDashboardPage.module.css";
import { Link } from "react-router";
import Card from "../components/common/Card/Card";
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
      <Link to="/admin/products">Manage Products</Link>

      <div className={styles.stats}>
        <Card>
          <h2>Total Users</h2>
          <p>{stats.totalUsers}</p>
        </Card>

        <Card>
          <h2>Total Orders</h2>
          <p>{stats.totalOrders}</p>
        </Card>

        <Card>
          <h2>Total Revenue</h2>
          <p>${stats.totalRevenue.toFixed(2)}</p>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboardPage;

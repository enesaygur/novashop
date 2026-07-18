import { NavLink } from "react-router";
import styles from "./Header.module.css";
function Header() {
  return (
    <header className={styles.header}>
      <h2 className={styles.logo}>NovaShop</h2>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Cart
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

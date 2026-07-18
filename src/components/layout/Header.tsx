import { NavLink } from "react-router";

function Header() {
  return (
    <header>
      <h2>NovaShop</h2>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Cart
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;

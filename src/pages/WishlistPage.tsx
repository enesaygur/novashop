import { Link } from "react-router";
import EmptyState from "../components/common/EmptyState";
import { useWishlist } from "../hooks/useWishlist";
import styles from "./WishlistPage.module.css";
import { useCart } from "../hooks/useCart";

function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();
  if (items.length === 0)
    return <EmptyState message="Your wishlist is empty" />;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wishlist</h1>

      <div className={styles.grid}>
        {items.map((product) => (
          <div key={product.id} className={styles.card}>
            <Link to={`/product/${product.id}`} className={styles.link}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.image}
              />
              <div className={styles.content}>
                <h2>{product.title}</h2>
                <p className={styles.price}>${product.price}</p>
              </div>
            </Link>
            <button onClick={() => addItem(product)}>Add to cart</button>
            <button onClick={() => removeItem(product.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;

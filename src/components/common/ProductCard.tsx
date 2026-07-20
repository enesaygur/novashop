import { Link } from "react-router";
import type { Product } from "../../types/Product";
import styles from "./ProductCard.module.css";
import { useCart } from "../../hooks/useCart";
type ProductCardProps = {
  product: Product;
};
function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  return (
    <article className={styles.card}>
      <Link to={`/products/${product.id}`} className={styles.link}>
        <img
          className={styles.image}
          src={product.thumbnail}
          alt={product.title}
        />
        <div className={styles.content}>
          <h3>{product.title}</h3>
          <p className={styles.brand}>{product.brand}</p>
          <p className={styles.price}>${product.price}</p>
          <p>⭐ {product.rating}</p>
          <p>Stock: {product.stock}</p>
        </div>
      </Link>
      <button type="button" onClick={() => addItem(product)}>
        Add to cart
      </button>
    </article>
  );
}

export default ProductCard;

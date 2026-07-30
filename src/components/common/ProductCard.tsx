import { Link } from "react-router";
import type { Product } from "../../types/Product";
import styles from "./ProductCard.module.css";
import { useCart } from "../../hooks/useCart";
import { useWishlist } from "../../hooks/useWishlist";
import Card from "./Card/Card";
import Button from "./Button/Button";
type ProductCardProps = {
  product: Product;
};
function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { addItem: addToWishlist } = useWishlist();
  return (
    <Card className={styles.card}>
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
      <Button onClick={() => addItem(product)}>Add to cart</Button>
      <Button onClick={() => addToWishlist(product)}>Add to wishlist</Button>
    </Card>
  );
}

export default ProductCard;

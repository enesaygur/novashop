import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";
import { useCart } from "../hooks/useCart";
import styles from "./ProductDetailPage.module.css";

function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isPending, error } = useProduct(productId);
  const { addItem } = useCart();

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h2>Something went wrong</h2>;
  if (!data) return <h2>Product not found</h2>;
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={data.thumbnail} alt={data.title} className={styles.image} />
      </div>

      <div className={styles.info}>
        <p className={styles.brand}>{data.brand}</p>

        <h1>{data.title}</h1>

        <div className={styles.rating}>⭐ {data.rating}</div>

        <p className={styles.description}>{data.description}</p>

        <p className={styles.price}>${data.price}</p>

        <p className={styles.stock}>Stock: {data.stock}</p>

        <button onClick={() => addItem(data)} disabled={data.stock === 0}>
          {data.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailPage;

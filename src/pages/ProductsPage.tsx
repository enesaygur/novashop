import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";
import styles from "./ProductsPage.module.css";

function ProductsPage() {
  const { data, isPending, error } = useProducts();

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage />;
  if (!data) return <EmptyState message="No products found" />;
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <div className={styles.grid}>
          {data?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
export default ProductsPage;

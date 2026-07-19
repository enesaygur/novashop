import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";
import styles from "./ProductsPage.module.css";
import SearchBar from "../components/common/SearchBar";

function ProductsPage() {
  const { data, isPending, error } = useProducts();
  const [search, setSearch] = useState("");
  const filteredProducts =
    data?.filter((product: Product) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    ) ?? [];

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <SearchBar value={search} onChange={setSearch} />
        {filteredProducts.length == 0 ? (
          <EmptyState message="No products match your search." />
        ) : (
          <div className={styles.grid}>
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default ProductsPage;

import { useState } from "react";
import EmptyState from "../components/common/EmptyState";
import ErrorMessage from "../components/common/ErrorMessage";
import Loader from "../components/common/Loader";
import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";
import styles from "./ProductsPage.module.css";
import SearchBar from "../components/common/SearchBar";
import { useCategories } from "../hooks/useCategories";
import { useSearchParams } from "react-router";
import CategoryFilter from "../components/common/CategoryFilter";

function ProductsPage() {
  const {
    data: products,
    isPending: productsPending,
    error: productsError,
  } = useProducts();
  const {
    data: categories = [],
    isPending: categoriesPending,
    error: categoriesError,
  } = useCategories();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const selectedCategory = searchParams.get("category") || "";
  const filteredProducts =
    products?.filter((product: Product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        selectedCategory === "" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    }) ?? [];

  if (productsPending || categoriesPending) return <Loader />;
  if (productsError || categoriesError) return <ErrorMessage />;

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={(value) => {
            setSearchParams(value ? { category: value } : {});
          }}
        />
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

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
import SortSelect from "../components/common/SortSelect";
import { useFilteredProducts } from "../hooks/useFilteredProducts";

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
  const search = searchParams.get("search") || "";
  const selectedCategory = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";

  const filtredProducts = useFilteredProducts({
    products: products ?? [],
    search,
    category: selectedCategory,
    sort,
  });

  if (productsPending || categoriesPending) return <Loader />;
  if (productsError || categoriesError) return <ErrorMessage />;

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Products</h1>
        <SearchBar
          value={search}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);
            if (value) {
              params.set("search", value);
            } else {
              params.delete("search");
            }
            setSearchParams(params);
          }}
        />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={(value) => {
            setSearchParams(value ? { category: value } : {});
          }}
        />
        <SortSelect
          value={sort}
          onChange={(value) => {
            const params = new URLSearchParams(searchParams);

            if (value) {
              params.set("sort", value);
            } else {
              params.delete("sort");
            }

            setSearchParams(params);
          }}
        />
        {filtredProducts.length == 0 ? (
          <EmptyState message="No products match your search." />
        ) : (
          <div className={styles.grid}>
            {filtredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
export default ProductsPage;

import ProductCard from "../components/common/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/Product";

function ProductsPage() {
  const { data, isPending, error } = useProducts();

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h2>Something went wrong</h2>;
  return (
    <>
      <h1>Products</h1>
      {data?.map((product: Product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}
export default ProductsPage;

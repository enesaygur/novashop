import { useProducts } from "../hooks/useProducts";

function ProductsPage() {
  const { data, isPending, error } = useProducts();

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h2>Something went wrong</h2>;
  return (
    <>
      <h1>Products</h1>
      {data?.map((product: any) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </>
  );
}
export default ProductsPage;

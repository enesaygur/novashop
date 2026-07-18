import { useParams } from "react-router";
import { useProduct } from "../hooks/useProduct";

function ProductDetailPage() {
  const { id } = useParams();
  const productId = Number(id);
  const { data, isPending, error } = useProduct(productId);

  if (isPending) return <h1>Loading...</h1>;
  if (error) return <h2>Something went wrong</h2>;
  if (!data) return <h2>Product not found</h2>;
  return (
    <>
      <img src={data.thumbnail} alt={data.title} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <h2>${data.price}</h2>
      <p>⭐ {data.rating}</p>
      <p>Brand: {data.brand}</p>
      <p>Stock: {data.stock}</p>
    </>
  );
}

export default ProductDetailPage;

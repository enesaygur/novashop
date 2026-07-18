import { useEffect, useState } from "react";
import { getProduction } from "../services/api/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProduction();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <>
      <h1>Products</h1>
      {products.map((product: any) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </>
  );
}
export default ProductsPage;

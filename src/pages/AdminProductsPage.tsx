import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import {
  getAdminProducts,
  saveAdminProducts,
} from "../services/admin/adminProductStorage";
import { getProducts } from "../services/api/products";

function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>(getAdminProducts());
  useEffect(() => {
    async function loadProducts() {
      const storedProducts = getAdminProducts();
      if (storedProducts.length > 0) {
        setProducts(storedProducts);
        return;
      }
      const apiProducts = await getProducts();
      setProducts(apiProducts);
      saveAdminProducts(apiProducts);
    }
    loadProducts();
  }, []);
  function handleDelete(productId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
    saveAdminProducts(updatedProducts);
  }
  return (
    <div>
      <h1>Admin Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.title}</h1>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminProductsPage;

import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../types/Product";
import {
  getAdminProducts,
  saveAdminProducts,
} from "../services/admin/adminProductStorage";
import { getProducts } from "../services/api/products";
import styles from "./AdminProductsPage.module.css";
import ProductForm from "../components/admin/ProductForm";
function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const storedProducts = getAdminProducts();
      if (storedProducts.length > 0) {
        setProducts(storedProducts);
        setIsLoading(false);
        return;
      }
      const apiProducts = await getProducts();
      setProducts(apiProducts);
      saveAdminProducts(apiProducts);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }
  function handleDelete(productId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
    saveAdminProducts(updatedProducts);
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Products</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className={styles.addButton}
        >
          Add Product
        </button>
      </div>
      {isFormOpen && (
        <div className={styles.formWrapper}>
          <ProductForm
            onSubmit={handleCreate}
            onCancel={() => setIsFormOpen(false)}
          />
        </div>
      )}

      {isLoading ? (
        <p className={styles.message}>Loading products...</p>
      ) : products.length === 0 ? (
        <p className={styles.message}>No products found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className={styles.productCell}>
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className={styles.thumbnail}
                      />

                      <div>
                        <strong>{product.title}</strong>
                        <p className={styles.description}>
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>

                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProductsPage;

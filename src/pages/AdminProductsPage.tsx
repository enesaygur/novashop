import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import {
  getAdminProducts,
  saveAdminProducts,
} from "../services/admin/adminProductStorage";
import { getProducts } from "../services/api/products";
import styles from "./AdminProductsPage.module.css";
import ProductForm from "../components/admin/ProductForm";
import Modal from "../components/common/Modal";
import { toast } from "react-hot-toast";
import Button from "../components/common/Button/Button";
function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

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

  const categories = [...new Set(products.map((product) => product.category))];

  function handleCreate(product: Product) {
    const updateProducts = [product, ...products];
    setProducts(updateProducts);
    saveAdminProducts(updateProducts);
    setIsFormOpen(false);
    toast.success("Product created successfully");
  }

  function handleUpdate(updatedProduct: Product) {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product,
    );
    setProducts(updatedProducts);
    saveAdminProducts(updatedProducts);
    setEditingProduct(null);
    setIsFormOpen(false);
    toast.success("Product updated successfully");
  }

  function handleDelete(productId: number) {
    const updatedProducts = products.filter(
      (product) => product.id !== productId,
    );
    setProducts(updatedProducts);
    saveAdminProducts(updatedProducts);
    toast.success("Product deleted successfully");
  }

  function handleCloseForm() {
    setEditingProduct(null);
    setIsFormOpen(false);
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.price - b.price;
      }

      if (sortBy === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortBy]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Admin Products</h1>

        <Button
          onClick={() => setIsFormOpen(true)}
          className={styles.addButton}
        >
          Add Product
        </Button>
      </div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.filters}>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-asc">Price (Low → High)</option>
          <option value="price-desc">Price (High → Low)</option>
        </select>
      </div>
      {isFormOpen && (
        <div className={styles.formWrapper}>
          <ProductForm
            initialValues={editingProduct ?? undefined}
            submitLabel={editingProduct ? "Save Changes" : "Create Product"}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={handleCloseForm}
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
              {paginatedProducts.map((product) => (
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
                      <Button
                        variant="secondary"
                        className={styles.editButton}
                        onClick={() => {
                          setEditingProduct(product);
                          setIsFormOpen(true);
                          window.scrollTo({ top: 200, behavior: "smooth" });
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        className={styles.deleteButton}
                        onClick={() => setProductToDelete(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Modal
            isOpen={productToDelete !== null}
            title="Delete Product"
            onClose={() => setProductToDelete(null)}
          >
            <p>
              Are you sure you want to delete{" "}
              <strong>{productToDelete?.title}</strong>?
            </p>
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={() => setProductToDelete(null)}>Cancel</Button>
              <Button
                variant="danger"
                onClick={() => {
                  if (!productToDelete) return;
                  handleDelete(productToDelete.id);
                  setProductToDelete(null);
                }}
              >
                Delete
              </Button>
            </div>
          </Modal>
          <div className={styles.pagination}>
            <Button
              onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} / {totalPages || 1}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((page) => Math.min(page + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProductsPage;

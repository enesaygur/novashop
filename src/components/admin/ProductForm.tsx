import { useState, type FormEvent } from "react";
import type { Product } from "../../types/Product";
import styles from "./ProductForm.module.css";

type ProductFormState = {
  title: string;
  description: string;
  price: string;
  discountPercentage: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  thumbnail: string;
};
interface ProductFormProps {
  initialValues?: Partial<Product>;
  submitLabel?: string;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

function buildInitialState(initialValues?: Partial<Product>): ProductFormState {
  return {
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    price: initialValues?.price?.toString() || "",
    discountPercentage: initialValues?.discountPercentage?.toString() || "0",
    rating: initialValues?.rating?.toString() || "",
    stock: initialValues?.stock?.toString() || "",
    brand: initialValues?.brand || "",
    category: initialValues?.category || "",
    thumbnail: initialValues?.thumbnail || "",
  };
}

function ProductForm({
  initialValues,
  submitLabel = "Create",
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [form, setForm] = useState<ProductFormState>(() =>
    buildInitialState(initialValues),
  );
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newProduct: Product = {
      id: initialValues?.id ?? Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      discountPercentage: Number(form.discountPercentage) || 0,
      rating: Number(form.rating) || 0,
      stock: Number(form.stock) || 0,
      brand: form.brand.trim(),
      category: form.category.trim(),
      thumbnail: form.thumbnail.trim(),
    };

    onSubmit(newProduct);

    if (!initialValues) {
      setForm(buildInitialState());
    }
  }

  function updateField(field: keyof ProductFormState, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{initialValues ? "Edit Product" : "Create Product"}</h2>

      <div className={styles.group}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          required
        />
      </div>

      <div className={styles.group}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          rows={4}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          required
        />
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            min="0"
            step="0.01"
            value={form.price}
            onChange={(e) => updateField("price", e.target.value)}
            required
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            id="stock"
            min="0"
            step="1"
            value={form.stock}
            onChange={(e) => updateField("stock", e.target.value)}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.group}>
          <label htmlFor="brand">Brand</label>
          <input
            id="brand"
            type="text"
            value={form.brand}
            onChange={(e) => updateField("brand", e.target.value)}
            required
          />
        </div>

        <div className={styles.group}>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.group}>
        <label htmlFor="thumbnail">Thumbnail URL</label>
        <input
          id="thumbnail"
          type="text"
          value={form.thumbnail}
          onChange={(e) => updateField("thumbnail", e.target.value)}
          required
        />
      </div>

      <div className={styles.actions}>
        <button type="submit">{submitLabel}</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default ProductForm;

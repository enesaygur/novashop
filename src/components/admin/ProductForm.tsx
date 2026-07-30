import { useEffect, useState, type FormEvent } from "react";
import type { Product } from "../../types/Product";
import styles from "./ProductForm.module.css";
import { productSchema } from "../../validations/productSchema";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";

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
  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductFormState, string>>
  >({});
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationResult = productSchema.safeParse({ ...form });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        title: fieldErrors.title?.[0],
        description: fieldErrors.description?.[0],
        price: fieldErrors.price?.[0],
        discountPercentage: fieldErrors.discountPercentage?.[0],
        rating: fieldErrors.rating?.[0],
        stock: fieldErrors.stock?.[0],
        brand: fieldErrors.brand?.[0],
        category: fieldErrors.category?.[0],
        thumbnail: fieldErrors.thumbnail?.[0],
      });
      return;
    }
    setErrors({});
    const newProduct: Product = {
      id: initialValues?.id ?? Date.now(),
      title: form.title.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      discountPercentage: Number(form.discountPercentage) || 0,
      rating: Number(form.rating) || 0,
      stock: Number(form.stock) || 0,
      brand: form.brand.trim() || "novashop",
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

  useEffect(() => {
    setForm(buildInitialState(initialValues));
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{initialValues ? "Edit Product" : "Create Product"}</h2>
      <Input
        label="Title"
        name="title"
        value={form.title}
        onChange={(e) => updateField("title", e.target.value)}
        error={errors.title}
      />
      <Input
        label="Description"
        name="description"
        value={form.description}
        onChange={(e) => updateField("description", e.target.value)}
        error={errors.description}
      />
      <div className={styles.row}>
        <Input
          label="Price"
          name="price"
          value={form.price}
          onChange={(e) => updateField("price", e.target.value)}
          error={errors.price}
        />
        <Input
          label="Stock"
          name="stock"
          value={form.stock}
          onChange={(e) => updateField("stock", e.target.value)}
          error={errors.stock}
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Brand"
          name="brand"
          value={form.brand}
          onChange={(e) => updateField("brand", e.target.value)}
          error={errors.brand}
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          error={errors.category}
        />
      </div>

      <div className={styles.group}>
        <Input
          label="Thumbnail"
          name="thumbnail"
          value={form.thumbnail}
          onChange={(e) => updateField("thumbnail", e.target.value)}
          error={errors.thumbnail}
        />
        <div className={styles.thumbnail}>
          {form.thumbnail && (
            <img
              src={form.thumbnail}
              alt="Preview"
              className={styles.previewImage}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">{submitLabel}</Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;

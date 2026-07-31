import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Product } from "../../types/Product";
import styles from "./ProductForm.module.css";
import { productSchema } from "../../validations/productSchema";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import type { z } from "zod";

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormData = z.output<typeof productSchema>;
interface ProductFormProps {
  initialValues?: Partial<Product>;
  submitLabel?: string;
  onSubmit: (product: Product) => void;
  onCancel: () => void;
}

function buildInitialState(initialValues?: Partial<Product>): ProductFormInput {
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
  onSubmit: onProductSubmit,
  onCancel,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductFormInput, unknown, ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: buildInitialState(initialValues),
  });
  const thumbnail = watch("thumbnail");
  function onSubmit(data: ProductFormData) {
    const newProduct: Product = {
      id: initialValues?.id ?? Date.now(),
      title: data.title.trim(),
      description: data.description.trim(),
      price: Number(data.price),
      discountPercentage: Number(data.discountPercentage) || 0,
      rating: Number(data.rating) || 0,
      stock: Number(data.stock) || 0,
      brand: data.brand.trim() || "novashop",
      category: data.category.trim(),
      thumbnail: data.thumbnail.trim(),
    };

    onProductSubmit(newProduct);

    if (!initialValues) {
      reset(buildInitialState());
    }
  }

  useEffect(() => {
    reset(buildInitialState(initialValues));
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2>{initialValues ? "Edit Product" : "Create Product"}</h2>
      <Input
        label="Title"
        id="title"
        {...register("title")}
        error={errors?.title?.message}
      />
      <Input
        label="Description"
        id="description"
        {...register("description")}
        error={errors?.description?.message}
      />
      <div className={styles.row}>
        <Input
          label="Price"
          id="price"
          type="number"
          {...register("price")}
          error={errors?.price?.message}
        />
        <Input
          label="Stock"
          id="stock"
          type="number"
          {...register("stock")}
          error={errors?.stock?.message}
        />
      </div>

      <div className={styles.row}>
        <Input
          label="Brand"
          id="brand"
          {...register("brand")}
          error={errors?.brand?.message}
        />

        <Input
          label="Category"
          id="category"
          {...register("category")}
          error={errors?.category?.message}
        />
      </div>

      <div className={styles.group}>
        <Input
          label="Thumbnail"
          id="thumbnail"
          {...register("thumbnail")}
          error={errors?.thumbnail?.message}
        />
        <div className={styles.thumbnail}>
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Preview"
              className={styles.previewImage}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit">{submitLabel}</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;

import { z } from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),
  description: z.string().trim().min(10, "Description is too short"),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
  brand: z.string().trim().min(2, "Brand is required"),
  category: z.string().trim().min(2, "Category is required"),
  thumbnail: z.url("Thumbnail must be a valid URL"),
  rating: z.coerce.number().min(0).max(5),
  discountPercentage: z.coerce.number().min(0).max(100),
});

export type ProductFormData = z.infer<typeof productSchema>;

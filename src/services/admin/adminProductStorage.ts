import type { Product } from "../../types/Product";

const ADMIN_PRODUCTS_STORAGE_KEY = "adminProducts";
export function getAdminProducts(): Product[] {
  const data = localStorage.getItem(ADMIN_PRODUCTS_STORAGE_KEY);
  if (!data) return [];

  return JSON.parse(data);
}

export function saveAdminProducts(products: Product[]) {
  localStorage.setItem(ADMIN_PRODUCTS_STORAGE_KEY, JSON.stringify(products));
}

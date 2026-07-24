import type { Product } from "../../types/Product";

const WISHLIST_STORAGE_KEY = "wishlist";

export function getWishlist() {
  const data = localStorage.getItem(WISHLIST_STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

export function saveWishlist(products: Product[]) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(products));
}

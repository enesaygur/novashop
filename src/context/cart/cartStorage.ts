import type { CartItem } from "../../types/CartItem";

const CART_STORAGE_KEY = "novashop-cart";

export function saveCart(items: CartItem[]) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function getCart(): CartItem[] {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  if (!storedCart) return [];

  return JSON.parse(storedCart);
}

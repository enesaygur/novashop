import type { Order } from "../types/Order";

const ORDER_KEY = "orders";

export function getOrders(): Order[] {
  const storedOrders = localStorage.getItem(ORDER_KEY);

  if (!storedOrders) return [];

  return JSON.parse(storedOrders);
}

export function saveOrder(order: Order): void {
  const orders = getOrders();

  localStorage.setItem(ORDER_KEY, JSON.stringify([...orders, order]));
}

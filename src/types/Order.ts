import type { CartItem } from "./CartItem";

export interface Order {
  id: string;
  items: CartItem[];
  customer: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
}

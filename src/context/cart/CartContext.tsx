import { createContext, useReducer, type ReactNode } from "react";
import type { CartItem } from "../../types/CartItem";
import type { Product } from "../../types/Product";
import { cartReducer, initialState } from "./CartReducer";
import { CART_ACTIONS } from "./cartActions";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addItem(product: Product) {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  }

  function removeItem(productId: number) {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, paylaod: productId });
  }

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

import { createContext, useEffect, useReducer, type ReactNode } from "react";
import type { CartItem } from "../../types/CartItem";
import type { Product } from "../../types/Product";
import { cartReducer, initialState } from "./CartReducer";
import { CART_ACTIONS } from "./cartActions";
import { saveCart } from "./cartStorage";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
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
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  }

  function increaseQuantity(productId: number) {
    dispatch({ type: CART_ACTIONS.INCREASE_QUANTITY, payload: productId });
  }

  function decreaseQuantity(productId: number) {
    dispatch({ type: CART_ACTIONS.DECREASE_QUANTITY, payload: productId });
  }

  function clearCart() {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }

  useEffect(() => {
    saveCart(state.items);
  }, [state.items]);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

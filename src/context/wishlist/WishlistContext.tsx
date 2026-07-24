import { createContext, useEffect, useReducer, type ReactNode } from "react";
import type { Product } from "../../types/Product";
import { initialState, wishlistReducer } from "./WishlistReducer";
import { WISHLIST_ACTIONS } from "./wishlistActions";
import { saveWishlist } from "./wishlistStorage";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
}

export const WishlistContext = createContext<WishlistContextType | null>(null);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  function addItem(product: Product) {
    dispatch({ type: WISHLIST_ACTIONS.ADD_ITEM, payload: product });
  }

  function removeItem(productId: number) {
    dispatch({ type: WISHLIST_ACTIONS.REMOVE_ITEM, payload: productId });
  }

  useEffect(() => {
    saveWishlist(state.items);
  }, [state.items]);

  return (
    <WishlistContext.Provider
      value={{ items: state.items, addItem, removeItem }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

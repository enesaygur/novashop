import type { Product } from "../../types/Product";
import { WISHLIST_ACTIONS } from "./wishlistActions";
import { getWishlist } from "./wishlistStorage";

export interface WishlistState {
  items: Product[];
}

export type WishlistAction =
  | { type: typeof WISHLIST_ACTIONS.ADD_ITEM; payload: Product }
  | {
      type: typeof WISHLIST_ACTIONS.REMOVE_ITEM;
      payload: number;
    };

export const initialState: WishlistState = {
  items: getWishlist(),
};

export function wishlistReducer(
  state: WishlistState,
  action: WishlistAction,
): WishlistState {
  switch (action.type) {
    case WISHLIST_ACTIONS.ADD_ITEM: {
      const alreadyExists = state.items.some(
        (item) => item.id === action.payload.id,
      );
      if (alreadyExists) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case WISHLIST_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }
    default:
      return state;
  }
}

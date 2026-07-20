import type { CartItem } from "../../types/CartItem";
import type { Product } from "../../types/Product";
import { CART_ACTIONS } from "./cartActions";

export interface CartState {
  items: CartItem[];
}

export type CartAction = {
  type: typeof CART_ACTIONS.ADD_ITEM;
  payload: Product;
};

export const initialState: CartState = {
  items: [],
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id,
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }],
      };
    }
    default:
      return state;
  }
}

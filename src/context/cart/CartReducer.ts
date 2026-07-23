import type { CartItem } from "../../types/CartItem";
import type { Product } from "../../types/Product";
import { CART_ACTIONS } from "./cartActions";
import { getCart } from "./cartStorage";

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | {
      type: typeof CART_ACTIONS.ADD_ITEM;
      payload: Product;
    }
  | {
      type: typeof CART_ACTIONS.REMOVE_ITEM;
      payload: number;
    }
  | {
      type: typeof CART_ACTIONS.INCREASE_QUANTITY;
      payload: number;
    }
  | {
      type: typeof CART_ACTIONS.DECREASE_QUANTITY;
      payload: number;
    }
  | {
      type: typeof CART_ACTIONS.CLEAR_CART;
    };

export const initialState: CartState = {
  items: getCart(),
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
    case CART_ACTIONS.REMOVE_ITEM: {
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.payload),
      };
    }

    case CART_ACTIONS.INCREASE_QUANTITY: {
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        ),
      };
    }
    case CART_ACTIONS.DECREASE_QUANTITY: {
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.product.id === action.payload
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case CART_ACTIONS.CLEAR_CART: {
      return {
        ...state,
        items: [],
      };
    }
    default:
      return state;
  }
}

import type { User } from "../../types/User";
import { AUTH_ACTIONS } from "./authActions";
import { getUser } from "./authStorage";

interface AuthState {
  user: User | null;
}

type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOGIN; payload: User }
  | { type: typeof AUTH_ACTIONS.LOGOUT };

export const initialState: AuthState = {
  user: getUser() || null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN: {
      return {
        user: action.payload,
      };
    }

    case AUTH_ACTIONS.LOGOUT: {
      return {
        user: null,
      };
    }

    default:
      return state;
  }
}

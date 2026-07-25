import { createContext, useReducer, type ReactNode } from "react";
import type { User } from "../../types/User";
import { authReducer, initialState } from "./AuthReducer";
import { AUTH_ACTIONS } from "./authActions";
import { removeUser, saveUser } from "./authStorage";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(user: User) {
    saveUser(user);
    dispatch({ type: AUTH_ACTIONS.LOGIN, payload: user });
  }

  function logout() {
    removeUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

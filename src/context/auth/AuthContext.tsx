import { createContext, useReducer, type ReactNode } from "react";
import type { User } from "../../types/User";
import { authReducer, initialState } from "./AuthReducer";
import { AUTH_ACTIONS } from "./authActions";
import {
  getUser,
  getUsers,
  removeUser,
  saveUser,
  saveUsers,
} from "./authStorage";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(email: string, password: string) {
    const users = getUsers();
    const existingUser = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (!existingUser) {
      throw new Error("Invalid email or password.");
    }

    saveUser(existingUser);
    dispatch({ type: AUTH_ACTIONS.LOGIN, payload: existingUser });
  }

  function logout() {
    removeUser();
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  }

  function register(user: User) {
    const users = getUsers();

    const userAlreadyExists = users.some(
      (existingUser) => existingUser.email === user.email,
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    saveUsers([...users, user]);
  }

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

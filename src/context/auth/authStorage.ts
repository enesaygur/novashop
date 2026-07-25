import type { User } from "../../types/User";

const AUTH_STORAGE_KEY = "user";

export function saveUser(user: User) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!data) return null;

  return JSON.parse(data);
}

export function removeUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

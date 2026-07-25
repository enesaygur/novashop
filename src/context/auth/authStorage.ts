import type { User } from "../../types/User";

const AUTH_STORAGE_KEY = "user";
const ALL_USERS_STORAGE_KEY = "users";

export function getUsers(): User[] {
  const data = localStorage.getItem(ALL_USERS_STORAGE_KEY);

  if (!data) return [];

  return JSON.parse(data);
}

export function saveUsers(users: User[]) {
  localStorage.setItem(ALL_USERS_STORAGE_KEY, JSON.stringify(users));
}

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

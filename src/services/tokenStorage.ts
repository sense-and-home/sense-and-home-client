import { type UserResponse } from "./authService";

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem("access_token"),
  setAccessToken: (token: string) =>
    localStorage.setItem("access_token", token),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  setRefreshToken: (token: string) =>
    localStorage.setItem("refresh_token", token),
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  getUser: () => {
    const userData = localStorage.getItem("user_data");
    return userData ? (JSON.parse(userData) as UserResponse) : null;
  },
};

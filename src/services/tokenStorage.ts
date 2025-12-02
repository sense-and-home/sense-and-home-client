import type { User } from "@/types/user";

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
  isAuthenticated: () => !!localStorage.getItem("accessToken"),
  setUser: (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
  },
  getUser: () => {
    const userData = localStorage.getItem("user");
    return userData ? (JSON.parse(userData) as User) : null;
  },
};

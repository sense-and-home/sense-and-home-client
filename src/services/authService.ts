import { apiClient } from "./apiClient";

export interface UserSignUpRequest {
  full_name: string;
  email: string;
  specialization_title: string;
  company_name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  specialization?: {
    id: number;
    title: string;
  };
  is_active: boolean;
  role: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: UserResponse;
}

export interface ErrorResponse {
  code: number;
  message: string;
}

export interface ValidationErrorResponse {
  error: string;
  details: Array<{
    loc: string[];
    msg: string;
    type: string;
  }>;
}

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem("access_token"),
  setAccessToken: (token: string) =>
    localStorage.setItem("access_token", token),
  getRefreshToken: () => localStorage.getItem("refresh_token"),
  setRefreshToken: (token: string) =>
    localStorage.setItem("refresh_token", token),
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
  },
  isAuthenticated: () => !!localStorage.getItem("access_token"),
  getUser: (): UserResponse | null => {
    const data = localStorage.getItem("user_data");
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: UserResponse) => {
    localStorage.setItem("user_data", JSON.stringify(user));
  },
};

export const authAPI = {
  signup: async (data: UserSignUpRequest): Promise<AuthResponse> => {
    const result = await apiClient<AuthResponse>("/auth/signup", {
      method: "POST",
      body: data,
    });

    if (result.user) {
      tokenStorage.setUser(result.user);
    }
    if (result.access_token) {
      tokenStorage.setAccessToken(result.access_token);
    }
    if (result.refresh_token) {
      tokenStorage.setRefreshToken(result.refresh_token);
    }

    return result;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const result = await apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: data,
    });

    if (result.user) {
      tokenStorage.setUser(result.user);
    }
    if (result.access_token) {
      tokenStorage.setAccessToken(result.access_token);
    }
    if (result.refresh_token) {
      tokenStorage.setRefreshToken(result.refresh_token);
    }

    return result;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token available");

    const result = await apiClient<AuthResponse>("/auth/refresh", {
      method: "POST",
      body: { refresh_token: refreshToken },
    });

    if (result.user) {
      tokenStorage.setUser(result.user);
    }
    if (result.access_token) {
      tokenStorage.setAccessToken(result.access_token);
    }
    if (result.refresh_token) {
      tokenStorage.setRefreshToken(result.refresh_token);
    }

    return result;
  },
};

export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  specialization: (title: string): boolean => {
    return title.length >= 2 && title.length <= 256;
  },

  company: (name: string): boolean => {
    return name.length >= 2 && name.length <= 256;
  },

  password: (password: string): boolean => {
    return password.length >= 8;
  },
};

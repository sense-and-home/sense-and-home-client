const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";
// const API_BASE_URL = "http://localhost:8000/api/v1";

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
  clearTokens: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
  isAuthenticated: () => !!localStorage.getItem("access_token"),
};

const createFetchOptions = (method: string, body?: unknown) => ({
  method,
  mode: "cors" as RequestMode,
  credentials: "omit" as RequestCredentials,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
  body: body ? JSON.stringify(body) : undefined,
});

export const authAPI = {
  signup: async (data: UserSignUpRequest): Promise<AuthResponse> => {
    console.log("Making signup request to:", `${API_BASE_URL}/auth/signup`);

    const response = await fetch(
      `${API_BASE_URL}/auth/signup`,
      createFetchOptions("POST", data),
    );

    console.log("Signup response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Signup error response:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText, code: response.status };
      }
      throw error;
    }

    const result = await response.json();
    console.log("Signup success:", result);
    return result;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    console.log("Making login request to:", `${API_BASE_URL}/auth/login`);

    const response = await fetch(
      `${API_BASE_URL}/auth/login`,
      createFetchOptions("POST", data),
    );

    console.log("Login response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Login error response:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText, code: response.status };
      }
      throw error;
    }

    const result = await response.json();
    console.log("Login success:", result);
    return result;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const refreshToken = tokenStorage.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(
      `${API_BASE_URL}/auth/refresh`,
      createFetchOptions("POST", { refresh_token: refreshToken }),
    );

    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }

    return response.json();
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

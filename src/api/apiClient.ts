import { tokenStorage } from "@/services/tokenStorage";
import { keysToCamelCase, keysToSnakeCase } from "@/utils/caseConverters";
import axios, { type AxiosRequestConfig } from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
};

// public api for routes that DON'T require auth
export const publicApi = axios.create(axiosConfig);

publicApi.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      return config;
    }

    if (config.data) {
      config.data = keysToSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

publicApi.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = keysToCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// private api for routes that DO require auth
export const api = axios.create(axiosConfig);

api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      return config;
    }

    if (config.data) {
      config.data = keysToSnakeCase(config.data);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    if (response.data) {
      response.data = keysToCamelCase(response.data);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(error);

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();
        const response = await publicApi.post("/auth/refresh", {
          refreshToken,
        });
        const { accessToken } = response.data;

        tokenStorage.setAccessToken(accessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        return api(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }

    return Promise.reject(error);
  },
);

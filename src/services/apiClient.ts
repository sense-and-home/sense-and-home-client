import { tokenStorage } from "./tokenStorage";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/v1";

interface FetchOptions {
  method: string;
  body?: unknown | FormData;
  isMultipart?: boolean;
  withAuth?: boolean;
}

export const apiClient = async <T>(
  endpoint: string,
  { method, body, isMultipart = false, withAuth = false }: FetchOptions,
): Promise<T> => {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (!isMultipart) {
    headers["Content-Type"] = "application/json";
  }

  if (withAuth) {
    const token = tokenStorage.getAccessToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    mode: "cors",
    credentials: "omit",
    headers,
    body: body
      ? isMultipart
        ? (body as FormData)
        : JSON.stringify(body)
      : undefined,
  };

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);

  const text = await response.text();
  let data: any;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    throw { code: response.status, message: text || "Invalid JSON response" };
  }

  if (!response.ok) {
    throw data;
  }

  return data as T;
};

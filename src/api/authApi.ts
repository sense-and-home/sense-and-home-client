import type {
  AuthResponse,
  LogInRequest,
  RecoverPasswordRequest,
  RecoverPasswordResponse,
  SignUpRequest,
} from "@/types/auth";

import { publicApi } from "@/api/apiClient";

export async function signUp(data: SignUpRequest) {
  const response = await publicApi.post<AuthResponse>("auth/signup", data);
  return response.data;
}

export async function logIn(data: LogInRequest) {
  const response = await publicApi.post<AuthResponse>("auth/login", data);
  return response.data;
}

export async function recoverPassword(data: RecoverPasswordRequest) {
  const response = await publicApi.post<RecoverPasswordResponse>(
    "auth/password-recovery",
    data,
  );
  return response.data;
}

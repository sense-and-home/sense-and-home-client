import { api } from "@/api/apiClient";
import type {
  ManagerProfileQueryParameters,
  ManagerProfileResponse,
} from "@/types/manager";
import type { UserProfileResponse } from "@/types/user";

export async function getUserProfile(id?: number) {
  if (!id) return null;
  const response = await api.get<UserProfileResponse>(
    `auth/profile/user/${id}`,
  );
  return response.data;
}

export async function getManagerProfile(
  id: number,
  params: ManagerProfileQueryParameters,
) {
  const response = await api.get<ManagerProfileResponse>(
    `auth/profile/manager/${id}`,
    { params },
  );
  return response.data;
}

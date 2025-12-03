import { api } from "@/api/apiClient";
import type {
  Course,
  CourseFavoriteRequest,
  GetCourseByIdResponse,
  GetCoursesQueryParameters,
  GetCoursesResponse,
  GetFavoriteCoursesResponse,
} from "@/types/course";

export async function getCourses(params?: Partial<GetCoursesQueryParameters>) {
  const response = await api.get<GetCoursesResponse>("courses", { params });
  return response.data;
}

export async function getCourseById(id: string) {
  const response = await api.get<GetCourseByIdResponse>(`courses/${id}`);
  return response.data;
}

export async function getFavoriteCourses() {
  const response =
    await api.get<GetFavoriteCoursesResponse>("courses/favorites");
  return response.data;
}

export async function addCourseToFavorites(data: CourseFavoriteRequest) {
  const response = await api.post<Course>("courses/favorites", data);
  return response.data;
}

export async function removeCourseFromFavorites(data: CourseFavoriteRequest) {
  const response = await api.delete<Course>("courses/favorites", { data });
  return response.data;
}

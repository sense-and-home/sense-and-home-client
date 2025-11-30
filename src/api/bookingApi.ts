import { publicApi } from "@/api/apiClient";
import type {
  BookingCallRequest,
  BookingEmailRequest,
  BookingResponse,
} from "@/types/booking";

export async function requestCall(data: BookingCallRequest) {
  const response = await publicApi.post<BookingResponse>("booking/call", data);
  return response.data;
}

export async function requestEmail(data: BookingEmailRequest) {
  const response = await publicApi.post<BookingResponse>("booking/email", data);
  return response.data;
}

export async function requestConsultation(
  formData: FormData,
): Promise<BookingResponse> {
  const response = await publicApi.post("/booking/consult", formData);

  return response.data;
}

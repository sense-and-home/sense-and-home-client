import { apiClient } from "./apiClient";
import { tokenStorage } from "./tokenStorage";

export interface BookingCallRequest {
  phone: string;
}

export interface BookingEmailRequest {
  email: string;
}

export interface BookingConsultRequest {
  full_name: string;
  email: string;
  phone: string;
  consultation_type: "consult_without_details" | "consult_details";
}

export interface BookingRequestResponse {
  id: number;
  status: number;
  request_type: string;
  created_at: string;
}

export interface BookingResponse {
  access_token: string;
  refresh_token: string;
  booking_request: BookingRequestResponse;
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

export const bookingAPI = {
  requestCall: async (data: BookingCallRequest): Promise<BookingResponse> => {
    const result = await apiClient<BookingResponse>("/booking/call", {
      method: "POST",
      body: data,
    });

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);
    return result;
  },

  requestEmail: async (data: BookingEmailRequest): Promise<BookingResponse> => {
    const result = await apiClient<BookingResponse>("/booking/email", {
      method: "POST",
      body: data,
    });

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);
    return result;
  },

  requestConsult: async (formData: FormData): Promise<BookingResponse> => {
    const result = await apiClient<BookingResponse>("/booking/consult", {
      method: "POST",
      body: formData,
      isMultipart: true,
    });

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);
    return result;
  },
};

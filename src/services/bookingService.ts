import { API_BASE_URL, tokenStorage } from "./authService";

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

const createJsonFetchOptions = (method: string, body?: unknown) => ({
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

const createMultipartFetchOptions = (method: string) => ({
  method,
  mode: "cors" as RequestMode,
  credentials: "omit" as RequestCredentials,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  },
});

export const bookingAPI = {
  requestCall: async (data: BookingCallRequest): Promise<BookingResponse> => {
    console.log(
      "Making booking call request to:",
      `${API_BASE_URL}/booking/call`,
    );

    const response = await fetch(
      `${API_BASE_URL}/booking/call`,
      createJsonFetchOptions("POST", data),
    );

    console.log("Booking call response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Booking call error response:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText, code: response.status };
      }
      throw error;
    }

    const result = await response.json();
    console.log("Booking call success:", result);

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);

    return result;
  },

  requestEmail: async (data: BookingEmailRequest): Promise<BookingResponse> => {
    console.log(
      "Making booking email request to:",
      `${API_BASE_URL}/booking/email`,
    );

    const response = await fetch(
      `${API_BASE_URL}/booking/email`,
      createJsonFetchOptions("POST", data),
    );

    console.log("Booking email response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Booking email error response:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText, code: response.status };
      }
      throw error;
    }

    const result = await response.json();
    console.log("Booking email success:", result);

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);

    return result;
  },

  requestConsult: async (formData: FormData): Promise<BookingResponse> => {
    console.log(
      "Making booking consult request to:",
      `${API_BASE_URL}/booking/consult`,
    );

    const options = createMultipartFetchOptions("POST");
    (options as any).body = formData;

    const response = await fetch(`${API_BASE_URL}/booking/consult`, options);

    console.log("Booking consult response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Booking consult error response:", errorText);

      let error;
      try {
        error = JSON.parse(errorText);
      } catch {
        error = { message: errorText, code: response.status };
      }
      throw error;
    }

    const result = await response.json();
    console.log("Booking consult success:", result);

    tokenStorage.setAccessToken(result.access_token);
    tokenStorage.setRefreshToken(result.refresh_token);

    return result;
  },
};

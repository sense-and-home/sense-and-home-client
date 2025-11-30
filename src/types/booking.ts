export interface BookingCallRequest {
  phone: string;
}

export interface BookingEmailRequest {
  email: string;
}

export interface BookingConsultRequest {
  fullName: string;
  email: string;
  phone: string;
  consultationType: string;
  projectDetails?: any;
}

export interface BookingRequestResponse {
  id: number;
  status: number;
  requestType: string;
  createdAt: string;
}

export interface BookingResponse {
  accessToken: string;
  refreshtoken: string;
  bookingRequest: BookingRequestResponse;
}

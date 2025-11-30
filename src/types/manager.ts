import type { User } from "@/types/user";

export interface ManagerProfileQueryParameters {
  city: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ManagerStatistics {
  totalRequests: number;
  newRequestsCount: number;
  inProgressCount: number;
  statusBreakdown: Map<string, number>;
}

interface Office {
  id: number;
  name: string;
  city: string;
  companyName: string;
}

interface Requester {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

interface BookingRequest {
  id: number;
  status: number;
  statusLabel: string;
  requestType: string;
  projectDetails: string | null;
  office: Office;
  requester: Requester;
  createdAt: string;
  updatedAt: string;
}

export interface ManagerProfileResponse {
  manager: User;
  filters: ManagerProfileQueryParameters;
  stats: ManagerStatistics;
  bookingRequests: BookingRequest[];
}

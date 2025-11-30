export type Role = "user" | "manager";

interface Specialization {
  id: number;
  title: string;
}

interface Company {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  specialization: Specialization;
  company: Company;
  role: Role;
  isActive: boolean;
}

interface Booking {
  id: number;
}

export interface UserProfileResponse {
  user: User;
  booking: Booking;
}

export type UserRole = "admin" | "client";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  companyName: string;
  phone?: string;
  address?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;

emailVerified: boolean;

lastLogin?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  companyName: string;
}
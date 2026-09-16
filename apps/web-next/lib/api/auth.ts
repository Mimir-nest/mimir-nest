import { apiFetch } from "./client";

export interface User {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  isEmailVerified?: boolean;
  userdata?: {
    name: string;
    email: string;
  };
  user?: User;
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}

export async function signup(
  name: string,
  email: string,
  password: string,
  confirmpass: string
): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password, confirmpass }),
  });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function resendVerification(email: string): Promise<VerificationResponse> {
  return apiFetch<VerificationResponse>("/auth/resend-verification", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function verifyEmail(token: string): Promise<VerificationResponse> {
  return apiFetch<VerificationResponse>("/auth/verify-email", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
}

export async function logout(): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/logout", {
    method: "POST",
  });
}

export async function getCurrentUser(): Promise<UserResponse> {
  return apiFetch<UserResponse>("/auth/me", {
    method: "GET",
  });
}

import { apiFetch } from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  userdata?: {
    name: string;
    email: string;
    token: string;
  };
}

export interface UserResponse {
  success: boolean;
  user: User;
}

export async function signup(name: string, email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  return apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
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

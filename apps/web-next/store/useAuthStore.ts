import { create } from "zustand";
import {
  getCurrentUser,
  login as apiLogin,
  signup as apiSignup,
  logout as apiLogout,
  resendVerification as apiResendVerification,
  User,
  AuthResponse,
  VerificationResponse,
} from "@/lib/api/auth";
import { useBookmarkStore } from "./useBookmarkStore";
import { useProgressStore } from "./useProgressStore";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  unverifiedEmail: string | null;
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "signup";

  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, confirmpass: string) => Promise<AuthResponse>;
  resendVerification: (email: string) => Promise<VerificationResponse>;
  logout: () => Promise<void>;
  clearError: () => void;
  setUnverifiedEmail: (email: string | null) => void;
  openAuthModal: (tab?: "signin" | "signup") => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  unverifiedEmail: null,
  isAuthModalOpen: false,
  authModalTab: "signin",

  openAuthModal: (tab = "signin") => {
    if (typeof window !== "undefined") {
      window.location.href = tab === "signup" ? "/signup" : "/login";
    }
    set({ isAuthModalOpen: false, authModalTab: tab });
  },
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setUnverifiedEmail: (email) => set({ unverifiedEmail: email }),

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await getCurrentUser();
      if (res.success && res.user) {
        set({ user: res.user, isAuthenticated: true, isLoading: false });
        useBookmarkStore.getState().loadBookmarks();
        useProgressStore.getState().loadProgress();
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false });
      }
    } catch (err: any) {
      // 401 is unauthorized, meaning not logged in. Just set authenticated to false silently.
      if (err.status === 401) {
        set({ user: null, isAuthenticated: false, isLoading: false });
      } else {
        set({ user: null, isAuthenticated: false, isLoading: false, error: err.message });
      }
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      await apiLogin(email, password);
      const res = await getCurrentUser();
      set({
        user: res.user,
        isAuthenticated: true,
        isLoading: false,
        unverifiedEmail: null,
        error: null,
      });
      useBookmarkStore.getState().loadBookmarks();
      useProgressStore.getState().loadProgress();
    } catch (err: any) {
      // Check if email unverified (403 or message mentions verification)
      const isUnverified =
        err.status === 403 ||
        err.code === "FORBIDDEN" ||
        (err.message && err.message.toLowerCase().includes("verify"));

      if (isUnverified) {
        set({
          isLoading: false,
          unverifiedEmail: email,
          error: err.message || "Please verify your email address before logging in",
        });
      } else {
        set({ isLoading: false, error: err.message });
      }
      throw err;
    }
  },

  signup: async (name, email, password, confirmpass) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiSignup(name, email, password, confirmpass);
      set({
        isLoading: false,
        unverifiedEmail: email,
        error: null,
      });
      return res;
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  resendVerification: async (email) => {
    try {
      const res = await apiResendVerification(email);
      return res;
    } catch (err: any) {
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiLogout();
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        unverifiedEmail: null,
        error: null,
      });
      useBookmarkStore.getState().clearBookmarks();
      useProgressStore.getState().clearProgress();
    } catch (err: any) {
      // Clear local state even if network logout fails
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        unverifiedEmail: null,
        error: err.message,
      });
      useBookmarkStore.getState().clearBookmarks();
      useProgressStore.getState().clearProgress();
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

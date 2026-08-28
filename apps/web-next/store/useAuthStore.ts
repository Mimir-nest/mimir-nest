import { create } from "zustand";
import { getCurrentUser, login as apiLogin, signup as apiSignup, logout as apiLogout, User } from "@/lib/api/auth";
import { useBookmarkStore } from "./useBookmarkStore";
import { useProgressStore } from "./useProgressStore";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  isAuthModalOpen: false,

  openAuthModal: () => set({ isAuthModalOpen: true }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

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
      set({ user: res.user, isAuthenticated: true, isLoading: false });
      useBookmarkStore.getState().loadBookmarks();
      useProgressStore.getState().loadProgress();
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      await apiSignup(name, email, password);
      // Automatically login after successful signup
      await apiLogin(email, password);
      const res = await getCurrentUser();
      set({ user: res.user, isAuthenticated: true, isLoading: false });
      useBookmarkStore.getState().loadBookmarks();
      useProgressStore.getState().loadProgress();
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await apiLogout();
      set({ user: null, isAuthenticated: false, isLoading: false });
      useBookmarkStore.getState().clearBookmarks();
      useProgressStore.getState().clearProgress();
    } catch (err: any) {
      set({ isLoading: false, error: err.message });
      throw err;
    }
  },

  clearError: () => set({ error: null }),
}));

import { create } from "zustand";
import { fetchProgress, saveProgress as apiSaveProgress, deleteProgress as apiDeleteProgress, Progress } from "@/lib/api/progress";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";

interface ProgressState {
  progressList: Progress[];
  progressMap: Record<string, string>; // "contentType_contentId" -> status
  progressIdMap: Record<string, string>; // "contentType_contentId" -> progressId
  isLoading: boolean;

  loadProgress: () => Promise<void>;
  updateProgress: (contentType: string, contentId: string, status: string) => Promise<boolean>;
  removeProgress: (contentType: string, contentId: string) => Promise<boolean>;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progressList: [],
  progressMap: {},
  progressIdMap: {},
  isLoading: false,

  loadProgress: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    set({ isLoading: true });
    try {
      const res = await fetchProgress();
      const map: Record<string, string> = {};
      const idMap: Record<string, string> = {};
      res.data.forEach((p) => {
        const key = `${p.contentType}_${p.contentId}`;
        map[key] = p.status;
        idMap[key] = p.progressId;
      });
      set({ progressList: res.data, progressMap: map, progressIdMap: idMap, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      console.error("Failed to load progress:", err);
    }
  },

  updateProgress: async (contentType, contentId, status) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      return false;
    }

    try {
      const res = await apiSaveProgress(contentType, contentId, status);
      const key = `${contentType}_${contentId}`;
      set((state) => {
        const newMap = { ...state.progressMap, [key]: status };
        const newIdMap = { ...state.progressIdMap, [key]: res.data.progressId };
        const filteredList = state.progressList.filter((p) => p.progressId !== res.data.progressId);
        return {
          progressMap: newMap,
          progressIdMap: newIdMap,
          progressList: [...filteredList, res.data],
        };
      });
      return true;
    } catch (err: any) {
      console.error("Failed to update progress:", err);
      toast.error(err.message || "Failed to update progress");
      return false;
    }
  },

  removeProgress: async (contentType, contentId) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      return false;
    }

    const key = `${contentType}_${contentId}`;
    const { progressIdMap } = get();
    const progressId = progressIdMap[key];
    if (!progressId) return false;

    try {
      await apiDeleteProgress(progressId);
      set((state) => {
        const newMap = { ...state.progressMap };
        delete newMap[key];
        const newIdMap = { ...state.progressIdMap };
        delete newIdMap[key];
        return {
          progressMap: newMap,
          progressIdMap: newIdMap,
          progressList: state.progressList.filter((p) => p.progressId !== progressId),
        };
      });
      return true;
    } catch (err: any) {
      console.error("Failed to delete progress:", err);
      toast.error(err.message || "Failed to delete progress");
      return false;
    }
  },

  clearProgress: () => set({ progressList: [], progressMap: {}, progressIdMap: {}, isLoading: false }),
}));

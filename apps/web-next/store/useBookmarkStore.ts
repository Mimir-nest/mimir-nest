import { create } from "zustand";
import { fetchBookmarks, addBookmark as apiAddBookmark, deleteBookmark as apiDeleteBookmark, Bookmark } from "@/lib/api/bookmarks";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";

interface BookmarkState {
  bookmarks: Bookmark[];
  bookmarkMap: Record<string, string>; // "contentType_contentId" -> bookmarkId
  isLoading: boolean;
  
  loadBookmarks: () => Promise<void>;
  toggleBookmark: (contentType: string, contentId: string) => Promise<boolean>;
  clearBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarks: [],
  bookmarkMap: {},
  isLoading: false,

  loadBookmarks: async () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) return;
    set({ isLoading: true });
    try {
      const res = await fetchBookmarks();
      const map: Record<string, string> = {};
      res.data.forEach((b) => {
        map[`${b.contentType}_${b.contentId}`] = b.bookmarkId;
      });
      set({ bookmarks: res.data, bookmarkMap: map, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      console.error("Failed to load bookmarks:", err);
    }
  },

  toggleBookmark: async (contentType, contentId) => {
    const { isAuthenticated, openAuthModal } = useAuthStore.getState();
    if (!isAuthenticated) {
      openAuthModal();
      toast.error("Please sign in to bookmark items");
      return false;
    }

    const key = `${contentType}_${contentId}`;
    const { bookmarkMap } = get();
    const bookmarkId = bookmarkMap[key];

    if (bookmarkId) {
      // Delete
      try {
        await apiDeleteBookmark(bookmarkId);
        const newMap = { ...bookmarkMap };
        delete newMap[key];
        set((state) => ({
          bookmarkMap: newMap,
          bookmarks: state.bookmarks.filter((b) => b.bookmarkId !== bookmarkId),
        }));
        toast.success("Bookmark removed");
        return true;
      } catch (err: any) {
        toast.error(err.message || "Failed to remove bookmark");
        return false;
      }
    } else {
      // Add
      try {
        const res = await apiAddBookmark(contentType, contentId);
        const newMap = { ...bookmarkMap, [key]: res.data.bookmarkId };
        set((state) => ({
          bookmarkMap: newMap,
          bookmarks: [...state.bookmarks, res.data],
        }));
        toast.success("Added to bookmarks");
        return true;
      } catch (err: any) {
        toast.error(err.message || "Failed to add bookmark");
        return false;
      }
    }
  },

  clearBookmarks: () => set({ bookmarks: [], bookmarkMap: {}, isLoading: false }),
}));

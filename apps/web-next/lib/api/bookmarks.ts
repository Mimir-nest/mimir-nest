import { apiFetch } from "./client";

export interface Bookmark {
  bookmarkId: string;
  userId: string;
  contentType: string;
  contentId: string;
  createdAt: string;
}

export interface BookmarksResponse {
  success: boolean;
  data: Bookmark[];
}

export interface CreateBookmarkResponse {
  success: boolean;
  data: Bookmark;
}

export interface DeleteBookmarkResponse {
  success: boolean;
  message: string;
}

export async function fetchBookmarks(): Promise<BookmarksResponse> {
  return apiFetch<BookmarksResponse>("/bookmarks", {
    method: "GET",
  });
}

export async function addBookmark(contentType: string, contentId: string): Promise<CreateBookmarkResponse> {
  return apiFetch<CreateBookmarkResponse>("/bookmarks", {
    method: "POST",
    body: JSON.stringify({ contentType, contentId }),
  });
}

export async function deleteBookmark(bookmarkId: string): Promise<DeleteBookmarkResponse> {
  return apiFetch<DeleteBookmarkResponse>(`/bookmarks/${bookmarkId}`, {
    method: "DELETE",
  });
}

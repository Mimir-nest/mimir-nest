import { apiFetch } from "./client";

export interface Progress {
  progressId: string;
  userId: string;
  contentType: string;
  contentId: string;
  status: string;
  updatedAt: string;
}

export interface ProgressResponse {
  success: boolean;
  data: Progress[];
}

export interface SaveProgressResponse {
  success: boolean;
  data: Progress;
}

export interface DeleteProgressResponse {
  success: boolean;
  message: string;
}

export async function fetchProgress(): Promise<ProgressResponse> {
  return apiFetch<ProgressResponse>("/progress", {
    method: "GET",
  });
}

export async function saveProgress(
  contentType: string,
  contentId: string,
  status: string
): Promise<SaveProgressResponse> {
  return apiFetch<SaveProgressResponse>("/progress", {
    method: "POST",
    body: JSON.stringify({ contentType, contentId, status }),
  });
}

export async function deleteProgress(progressId: string): Promise<DeleteProgressResponse> {
  return apiFetch<DeleteProgressResponse>(`/progress/${progressId}`, {
    method: "DELETE",
  });
}

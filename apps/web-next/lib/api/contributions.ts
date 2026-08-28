import { apiFetch } from "./client";

export interface ContributedProblem {
  problemId: string;
  title: string;
  url: string;
  platform: string;
  status: string;
  company: string[] | null;
  comment: string;
  userId: string;
}

export interface ListContributionsResponse {
  success: boolean;
  data: ContributedProblem[];
}

export interface CreateContributionResponse {
  message: string;
}

export interface DeleteContributionResponse {
  success: boolean;
  message: string;
}

export async function fetchContributions(): Promise<ListContributionsResponse> {
  return apiFetch<ListContributionsResponse>("/contribute/view", {
    method: "GET",
  });
}

export async function createContribution(
  title: string,
  url: string,
  platform: string,
  company: string[] = []
): Promise<CreateContributionResponse> {
  return apiFetch<CreateContributionResponse>("/contribute/new", {
    method: "POST",
    body: JSON.stringify({ title, url, platform, company }),
  });
}

export async function deleteContribution(problemId: string): Promise<DeleteContributionResponse> {
  return apiFetch<DeleteContributionResponse>("/contribute/delete", {
    method: "DELETE",
    body: JSON.stringify({ problemId }),
  });
}

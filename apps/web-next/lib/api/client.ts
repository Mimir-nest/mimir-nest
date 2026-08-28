const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(message: string, code: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const config: RequestInit = {
    ...options,
    headers,
    credentials: "include", // Required to send and receive HttpOnly cookies
  };

  const response = await fetch(url, config);

  if (response.status === 204) {
    return {} as T;
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    if (!response.ok) {
      throw new ApiError(response.statusText, "HTTP_ERROR", response.status);
    }
    return {} as T;
  }

  if (!response.ok) {
    const errorCode = data?.error?.code || "UNKNOWN_ERROR";
    const errorMessage = data?.error?.message || "Something went wrong";
    throw new ApiError(errorMessage, errorCode, response.status);
  }

  return data as T;
}

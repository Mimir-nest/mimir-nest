export type JobStatus = "pending" | "running" | "done" | "dead";

export interface Job {
  id: string;
  type: string;
  payload: unknown;
  status: JobStatus;
  /** How many times a worker has started this job. */
  attempts: number;
  /** Not before this time (ms). */
  runAt: number;
  lastError?: string;
}

export type Handler = (payload: any) => Promise<void>;

export interface Logger {
  info(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  error(...args: unknown[]): void;
}

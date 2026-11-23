export const BASE_DELAY_MS = 1_000;
export const MAX_DELAY_MS = 5 * 60_000;

/** Delay before retrying after failed attempt number `attempt` (1-based): 1s, 2s, 4s, 8s, … up to 5 minutes. */
export function backoffMs(attempt: number): number {
  return BASE_DELAY_MS * 2 ** (attempt - 1);
}

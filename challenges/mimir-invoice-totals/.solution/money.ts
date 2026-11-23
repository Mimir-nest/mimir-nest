// All amounts are integer cents. Floats can't represent most cent values exactly
// (0.07 * 3 = 0.21000000000000002), so we convert once at the edge and round once per step.

export function toCents(dollars: number): number {
  return Math.round(dollars * 100);
}

export function formatUSD(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  return `${sign}$${Math.floor(abs / 100)}.${String(abs % 100).padStart(2, "0")}`;
}

/** Percentage of an amount in cents, rounded half-up to a whole cent. */
export function percentOf(cents: number, percent: number): number {
  return Math.round((cents * percent) / 100 + 1e-9);
}

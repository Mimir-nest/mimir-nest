// All amounts are in dollars.

export function formatUSD(amount: number): string {
  const sign = amount < 0 ? "-" : "";
  return `${sign}$${Math.abs(amount).toFixed(2)}`;
}

/** Percentage of an amount, e.g. percentOf(200, 8.25) === 16.5 */
export function percentOf(amount: number, percent: number): number {
  return (amount * percent) / 100;
}

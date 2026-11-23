import type { Customer, Plan } from "./types.ts";

const PLANS: Plan[] = ["free", "pro", "enterprise"];

/** Deterministic fake customers with ids 1..n. */
export function makeCustomers(n: number): Customer[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    email: `user${i + 1}@example.com`,
    company: `Company ${i + 1}`,
    plan: PLANS[i % PLANS.length],
    createdAt: new Date(Date.UTC(2025, 0, 1 + (i % 365))).toISOString(),
  }));
}

import type { Customer } from "./types.ts";

export const COLUMNS = ["id", "email", "company", "plan", "createdAt"] as const;

export function toCsvHeader(): string {
  return COLUMNS.join(",");
}

export function toCsvRow(customer: Customer): string {
  return COLUMNS.map((column) => String(customer[column])).join(",");
}

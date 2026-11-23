import type { Customer } from "./types.ts";

export const COLUMNS = ["id", "email", "company", "plan", "createdAt"] as const;

// RFC 4180: quote fields containing a comma, quote or newline; double any quotes inside.
const escape = (value: string) => (/[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

export function toCsvHeader(): string {
  return COLUMNS.join(",");
}

export function toCsvRow(customer: Customer): string {
  return COLUMNS.map((column) => escape(String(customer[column]))).join(",");
}

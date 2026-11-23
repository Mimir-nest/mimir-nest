import { CATALOG, type Sku } from "./catalog.ts";
import { percentOf } from "./money.ts";

export interface LineItem {
  sku: Sku;
  quantity: number;
}

export interface Invoice {
  lines: LineItem[];
  discountPercent?: number;
  taxRatePercent: number;
}

export interface Totals {
  lines: { description: string; quantity: number; amount: number }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
}

export function computeTotals(invoice: Invoice): Totals {
  const lines = invoice.lines.map(({ sku, quantity }) => ({
    description: CATALOG[sku].name,
    quantity,
    amount: CATALOG[sku].price * quantity,
  }));
  const subtotal = lines.reduce((sum, line) => sum + line.amount, 0);
  const discount = percentOf(subtotal, invoice.discountPercent ?? 0);
  const tax = percentOf(subtotal - discount, invoice.taxRatePercent);
  return { lines, subtotal, discount, tax, total: subtotal - discount + tax };
}

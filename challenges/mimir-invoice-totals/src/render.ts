import { computeTotals, type Invoice } from "./invoice.ts";
import { formatUSD } from "./money.ts";

const row = (label: string, value: string) => `${label.padEnd(32)}${value.padStart(12)}`;

/** The plain-text invoice we email to customers. */
export function renderInvoice(invoice: Invoice): string {
  const t = computeTotals(invoice);
  return [
    ...t.lines.map((l) => row(`${l.description} x${l.quantity}`, formatUSD(l.amount))),
    row("Subtotal", formatUSD(t.subtotal)),
    ...(t.discount ? [row(`Discount (${invoice.discountPercent}%)`, formatUSD(-t.discount))] : []),
    row(`Tax (${invoice.taxRatePercent}%)`, formatUSD(t.tax)),
    row("Total", formatUSD(t.total)),
  ].join("\n");
}

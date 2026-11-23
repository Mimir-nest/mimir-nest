import { test } from "node:test";
import assert from "node:assert/strict";
import { renderInvoice } from "../src/render.ts";
import type { Invoice } from "../src/invoice.ts";

const amounts = (text: string) => text.split("\n").map((line) => line.slice(32).trim());
const toCents = (s: string) => Math.round(Number(s.replace(/[$-]/g, "")) * 100) * (s.startsWith("-") ? -1 : 1);

test("printed subtotal, discount and tax add up to the printed total", () => {
  const invoice: Invoice = { lines: [{ sku: "seat", quantity: 3 }, { sku: "seat", quantity: 3 }], discountPercent: 10, taxRatePercent: 8.25 };
  const [, , subtotal, discount, tax, total] = amounts(renderInvoice(invoice)).map(toCents);
  assert.equal(subtotal + discount + tax, total, "a customer adding up the invoice gets a different total");
});

test("tax of exactly half a cent rounds up", () => {
  // $294.00 x 8.25% = $24.255 -> $24.26
  const text = renderInvoice({ lines: [{ sku: "support", quantity: 6 }], taxRatePercent: 8.25 });
  assert.deepEqual(amounts(text).slice(-2), ["$24.26", "$318.26"]);
});

test("matches the accounting system for a large order", () => {
  // Ledger: 686.00 x 8.25% = 56.595 -> 56.60
  const text = renderInvoice({ lines: [{ sku: "support", quantity: 11 }, { sku: "support", quantity: 3 }], taxRatePercent: 8.25 });
  assert.deepEqual(amounts(text).slice(-3), ["$686.00", "$56.60", "$742.60"]);
});

test("small unit prices multiply exactly", () => {
  const text = renderInvoice({ lines: [{ sku: "api", quantity: 3 }, { sku: "storage", quantity: 7 }, { sku: "sms", quantity: 9 }], taxRatePercent: 0 });
  assert.deepEqual(amounts(text), ["$0.21", "$2.45", "$10.35", "$13.01", "$0.00", "$13.01"]);
});

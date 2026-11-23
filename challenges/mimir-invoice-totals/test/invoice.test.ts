import { test } from "node:test";
import assert from "node:assert/strict";
import { renderInvoice } from "../src/render.ts";

const amounts = (text: string) => text.split("\n").map((line) => line.slice(32).trim());

test("renders one line per item plus subtotal, tax and total", () => {
  const text = renderInvoice({ lines: [{ sku: "support", quantity: 2 }], taxRatePercent: 10 });
  assert.equal(text.split("\n").length, 4);
  assert.deepEqual(amounts(text), ["$98.00", "$98.00", "$9.80", "$107.80"]);
});

test("shows the discount as a negative line", () => {
  const text = renderInvoice({ lines: [{ sku: "support", quantity: 1 }], discountPercent: 10, taxRatePercent: 0 });
  assert.match(text, /Discount \(10%\)\s+-\$4\.90/);
  assert.deepEqual(amounts(text).at(-1), "$44.10");
});

test("omits the discount line when there is no discount", () => {
  const text = renderInvoice({ lines: [{ sku: "seat", quantity: 1 }], taxRatePercent: 0 });
  assert.doesNotMatch(text, /Discount/);
});

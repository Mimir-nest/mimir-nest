import { test } from "node:test";
import assert from "node:assert/strict";
import { exportCustomers } from "../src/export.ts";
import { MemoryCustomerRepo } from "../src/repo.ts";
import { makeCustomers } from "../src/seed.ts";

const idsIn = (csv: string) => csv.split("\n").slice(1).map((line) => Number(line.split(",")[0]));

test("exports every customer when the count is not a multiple of the page size", async () => {
  const csv = await exportCustomers(new MemoryCustomerRepo(makeCustomers(273)), 100);
  const ids = idsIn(csv);
  assert.equal(ids.length, 273, `exported ${ids.length} of 273 customers`);
  assert.equal(new Set(ids).size, 273, "a customer was exported twice");
});

test("exports every customer when the count is an exact multiple of the page size", async () => {
  const csv = await exportCustomers(new MemoryCustomerRepo(makeCustomers(200)), 100);
  assert.equal(idsIn(csv).length, 200);
});

test("a single short page is still exported", async () => {
  const csv = await exportCustomers(new MemoryCustomerRepo(makeCustomers(3)), 100);
  assert.deepEqual(idsIn(csv), [1, 2, 3]);
});

test("an empty table exports just the header", async () => {
  const csv = await exportCustomers(new MemoryCustomerRepo([]), 100);
  assert.equal(csv, "id,email,company,plan,createdAt");
});

test("commas and quotes in a field stay in one column", async () => {
  const [customer] = makeCustomers(1);
  const repo = new MemoryCustomerRepo([{ ...customer, company: 'Acme, "West" Inc.' }]);
  const row = (await exportCustomers(repo, 100)).split("\n")[1];
  assert.equal(row, '1,user1@example.com,"Acme, ""West"" Inc.",free,2025-01-01T00:00:00.000Z');
});

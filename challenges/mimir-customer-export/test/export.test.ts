import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchPage } from "../src/paginate.ts";
import { MemoryCustomerRepo } from "../src/repo.ts";
import { toCsvHeader, toCsvRow } from "../src/csv.ts";
import { makeCustomers } from "../src/seed.ts";

test("first page returns pageSize rows and a cursor", async () => {
  const repo = new MemoryCustomerRepo(makeCustomers(25));
  const page = await fetchPage(repo, null, 10);
  assert.equal(page.items.length, 10);
  assert.equal(page.items[0].id, 1);
  assert.equal(page.nextCursor, 10);
});

test("last page has no cursor", async () => {
  const repo = new MemoryCustomerRepo(makeCustomers(25));
  const page = await fetchPage(repo, 20, 10);
  assert.deepEqual(page.items.map((c) => c.id), [21, 22, 23, 24, 25]);
  assert.equal(page.nextCursor, null);
});

test("csv header and a plain row", () => {
  const [customer] = makeCustomers(1);
  assert.equal(toCsvHeader(), "id,email,company,plan,createdAt");
  assert.equal(toCsvRow(customer), "1,user1@example.com,Company 1,free,2025-01-01T00:00:00.000Z");
});

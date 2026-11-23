import { test } from "node:test";
import assert from "node:assert/strict";
import { DashboardDb } from "../src/db.ts";
import { DashboardService } from "../src/dashboard.ts";

const revenue = { id: "w1", kind: "revenue", title: "MRR" } as const;

test("returns the user's widgets", async () => {
  const db = new DashboardDb();
  await db.saveWidgets("ten_acme", "u_7", [revenue]);
  const dash = await new DashboardService(db).get("ten_acme", "u_7");
  assert.deepEqual(dash.widgets, [revenue]);
});

test("a second read is served from the cache", async () => {
  const db = new DashboardDb();
  const service = new DashboardService(db);
  await service.get("ten_acme", "u_7");
  await service.get("ten_acme", "u_7");
  assert.equal(db.reads, 1);
});

test("entries expire after the TTL", async () => {
  let now = 0;
  const db = new DashboardDb();
  const service = new DashboardService(db, { ttlMs: 1_000, clock: () => now });
  await service.get("ten_acme", "u_7");
  now = 1_000;
  await service.get("ten_acme", "u_7");
  assert.equal(db.reads, 2);
});

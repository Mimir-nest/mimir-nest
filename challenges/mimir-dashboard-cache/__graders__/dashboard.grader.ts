import { test } from "node:test";
import assert from "node:assert/strict";
import { DashboardDb } from "../src/db.ts";
import { DashboardService } from "../src/dashboard.ts";
import { renderDashboard } from "../src/render.ts";

const acmeRevenue = { id: "w1", kind: "revenue", title: "Acme MRR" } as const;
const globexChurn = { id: "w9", kind: "churn", title: "Globex churn" } as const;

test("users with the same id in different tenants never share a dashboard", async () => {
  const db = new DashboardDb();
  await db.saveWidgets("ten_acme", "u_1", [acmeRevenue]);
  await db.saveWidgets("ten_globex", "u_1", [globexChurn]);
  const service = new DashboardService(db);
  await service.get("ten_acme", "u_1");
  const globex = await service.get("ten_globex", "u_1");
  assert.deepEqual(globex.widgets, [globexChurn], "Globex's admin was shown Acme's dashboard");
});

test("saving widgets is visible on the next read", async () => {
  const db = new DashboardDb();
  await db.saveWidgets("ten_acme", "u_1", [acmeRevenue]);
  const service = new DashboardService(db);
  await service.get("ten_acme", "u_1");
  await service.updateWidgets("ten_acme", "u_1", []);
  assert.deepEqual((await service.get("ten_acme", "u_1")).widgets, [], "dashboard still shows the old widgets after saving");
});

test("the announcement banner appears once, however many times the page loads", async () => {
  const db = new DashboardDb();
  await db.saveWidgets("ten_acme", "u_1", [acmeRevenue]);
  const service = new DashboardService(db);
  await renderDashboard(service, "ten_acme", "u_1", "Maintenance Sunday 02:00 UTC");
  await renderDashboard(service, "ten_acme", "u_1", "Maintenance Sunday 02:00 UTC");
  const widgets = await renderDashboard(service, "ten_acme", "u_1", "Maintenance Sunday 02:00 UTC");
  assert.equal(widgets.filter((w) => w.kind === "banner").length, 1);
  assert.deepEqual((await service.get("ten_acme", "u_1")).widgets, [acmeRevenue], "the banner leaked into the cached dashboard");
});

test("the cache still saves database reads", async () => {
  const db = new DashboardDb();
  const service = new DashboardService(db);
  for (let i = 0; i < 5; i++) await renderDashboard(service, "ten_acme", "u_1", "hi");
  assert.equal(db.reads, 1);
});

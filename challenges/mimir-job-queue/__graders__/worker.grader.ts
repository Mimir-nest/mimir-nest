import { test } from "node:test";
import assert from "node:assert/strict";
import { backoffMs, MAX_DELAY_MS } from "../src/backoff.ts";
import { JobStore } from "../src/store.ts";
import { Worker } from "../src/worker.ts";

const quiet = { info() {}, warn() {}, error() {} };
const tick = () => new Promise((resolve) => setTimeout(resolve, 2));

test("two workers never run the same job", async () => {
  const store = new JobStore();
  const runs = new Map<number, number>();
  const handlers = {
    payout: async (n: number) => {
      runs.set(n, (runs.get(n) ?? 0) + 1);
      await tick();
    },
  };
  for (let i = 0; i < 10; i++) await store.enqueue("payout", i);
  const a = new Worker(store, handlers, { id: "a", clock: () => 0, logger: quiet });
  const b = new Worker(store, handlers, { id: "b", clock: () => 0, logger: quiet });
  await Promise.all([a.drain(), b.drain()]);
  const twice = [...runs].filter(([, count]) => count > 1).map(([n]) => n);
  assert.deepEqual(twice, [], `jobs run more than once: ${twice.join(", ")}`);
  assert.equal(runs.size, 10, "some jobs never ran");
});

test("a job whose handler rejects is retried, not marked done", async () => {
  const store = new JobStore();
  const job = await store.enqueue("payout", {});
  const handlers = {
    payout: async () => {
      await tick();
      throw new Error("processor timeout");
    },
  };
  await new Worker(store, handlers, { id: "a", clock: () => 10_000, logger: quiet }).tick();
  const after = await store.get(job.id);
  assert.equal(after?.status, "pending", "a failed payout was recorded as done");
  assert.equal(after?.attempts, 1);
  assert.match(after?.lastError ?? "", /processor timeout/);
  assert.equal(after?.runAt, 10_000 + 1_000, "first retry should wait backoffMs(1) = 1s");
});

test("a job that keeps failing is dead-lettered after maxAttempts", async () => {
  const store = new JobStore();
  const job = await store.enqueue("payout", {});
  let calls = 0;
  let now = 0;
  const handlers = {
    payout: async () => {
      calls++;
      throw new Error("card declined");
    },
  };
  const worker = new Worker(store, handlers, { id: "a", maxAttempts: 3, clock: () => now, logger: quiet });
  for (let i = 0; i < 10; i++) {
    await worker.tick();
    now += MAX_DELAY_MS;
  }
  const after = await store.get(job.id);
  assert.equal(calls, 3, `handler ran ${calls} times, expected maxAttempts = 3`);
  assert.equal(after?.status, "dead");
  assert.match(after?.lastError ?? "", /card declined/);
});

test("a job with no handler is dead-lettered immediately", async () => {
  const store = new JobStore();
  const job = await store.enqueue("payout.sned", {});
  await new Worker(store, {}, { id: "a", clock: () => 0, logger: quiet }).tick();
  const after = await store.get(job.id);
  assert.equal(after?.status, "dead", "an unknown job type will be retried forever");
  assert.match(after?.lastError ?? "", /payout\.sned/);
});

test("retry delay is capped at five minutes", () => {
  assert.equal(backoffMs(20), MAX_DELAY_MS);
  assert.equal(backoffMs(10), MAX_DELAY_MS);
  assert.equal(backoffMs(3), 4_000);
});

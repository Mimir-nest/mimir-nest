import { test } from "node:test";
import assert from "node:assert/strict";
import { backoffMs } from "../src/backoff.ts";
import { makeHandlers } from "../src/handlers.ts";
import { JobStore } from "../src/store.ts";
import { Worker } from "../src/worker.ts";

const quiet = { info() {}, warn() {}, error() {} };

test("runs a pending payout and marks it done", async () => {
  const store = new JobStore();
  const transfers: string[] = [];
  const handlers = makeHandlers({ transfer: async (account, cents) => void transfers.push(`${account}:${cents}`) });
  const job = await store.enqueue("payout.send", { payoutId: "po_1", accountId: "acct_9", amountCents: 1250 });
  await new Worker(store, handlers, { id: "w1", clock: () => 0, logger: quiet }).drain();
  assert.deepEqual(transfers, ["acct_9:1250"]);
  assert.equal((await store.get(job.id))?.status, "done");
});

test("leaves jobs scheduled in the future alone", async () => {
  const store = new JobStore();
  const job = await store.enqueue("noop", {}, 5_000);
  const ran = await new Worker(store, { noop: async () => {} }, { id: "w1", clock: () => 1_000, logger: quiet }).tick();
  assert.equal(ran, false);
  assert.equal((await store.get(job.id))?.status, "pending");
});

test("runs jobs in the order they were enqueued", async () => {
  const store = new JobStore();
  const seen: number[] = [];
  for (let i = 1; i <= 3; i++) await store.enqueue("record", i);
  await new Worker(store, { record: async (n: number) => void seen.push(n) }, { id: "w1", clock: () => 0, logger: quiet }).drain();
  assert.deepEqual(seen, [1, 2, 3]);
});

test("backoff doubles from one second", () => {
  assert.deepEqual([1, 2, 3, 4].map(backoffMs), [1_000, 2_000, 4_000, 8_000]);
});

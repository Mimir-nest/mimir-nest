import { test } from "node:test";
import assert from "node:assert/strict";
import { TokenBucketLimiter } from "../src/limiter.ts";
import { MemoryStore, type BucketStore } from "../src/store.ts";

const quiet = { error() {}, warn() {}, info() {} };

const downStore: BucketStore = {
  get: () => Promise.reject(new Error("ETIMEDOUT redis:6379")),
  set: () => Promise.reject(new Error("ETIMEDOUT redis:6379")),
  transact: () => Promise.reject(new Error("ETIMEDOUT redis:6379")),
};

test("a concurrent burst never exceeds capacity", async () => {
  const limiter = new TokenBucketLimiter(new MemoryStore(), { capacity: 5, refillPerSec: 1, clock: () => 0, logger: quiet });
  const decisions = await Promise.all(Array.from({ length: 20 }, () => limiter.take("cus_acme")));
  const allowed = decisions.filter((d) => d.allowed).length;
  assert.equal(allowed, 5, `bucket of 5 admitted ${allowed} of 20 concurrent requests`);
});

test("rejects traffic when the bucket store is unreachable", async () => {
  const limiter = new TokenBucketLimiter(downStore, { capacity: 5, refillPerSec: 1, clock: () => 0, logger: quiet });
  const decision = await limiter.take("cus_acme");
  assert.equal(decision.allowed, false, "limiter admitted a request it could not account for");
});

test("reports store failures to the logger", async () => {
  const errors: unknown[][] = [];
  const logger = { ...quiet, error: (...args: unknown[]) => void errors.push(args) };
  const limiter = new TokenBucketLimiter(downStore, { capacity: 5, refillPerSec: 1, clock: () => 0, logger });
  await limiter.take("cus_acme");
  assert.equal(errors.length, 1, "store failure was not logged at error level");
});

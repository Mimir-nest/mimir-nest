import { test } from "node:test";
import assert from "node:assert/strict";
import { TokenBucketLimiter } from "../src/limiter.ts";
import { MemoryStore } from "../src/store.ts";

const quiet = { error() {}, warn() {}, info() {} };

test("allows up to capacity, then rejects", async () => {
  const limiter = new TokenBucketLimiter(new MemoryStore(), { capacity: 3, refillPerSec: 1, clock: () => 0, logger: quiet });
  const results = [];
  for (let i = 0; i < 5; i++) results.push((await limiter.take("cus_acme")).allowed);
  assert.deepEqual(results, [true, true, true, false, false]);
});

test("refills over time", async () => {
  let now = 0;
  const limiter = new TokenBucketLimiter(new MemoryStore(), { capacity: 2, refillPerSec: 1, clock: () => now, logger: quiet });
  await limiter.take("cus_acme");
  await limiter.take("cus_acme");
  assert.equal((await limiter.take("cus_acme")).allowed, false);
  now += 1_000;
  assert.equal((await limiter.take("cus_acme")).allowed, true);
});

test("keeps a separate bucket per customer", async () => {
  const limiter = new TokenBucketLimiter(new MemoryStore(), { capacity: 1, refillPerSec: 1, clock: () => 0, logger: quiet });
  assert.equal((await limiter.take("cus_noisy")).allowed, true);
  assert.equal((await limiter.take("cus_noisy")).allowed, false);
  assert.equal((await limiter.take("cus_quiet")).allowed, true);
});

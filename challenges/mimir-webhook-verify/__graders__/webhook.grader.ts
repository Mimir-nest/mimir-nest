import { test } from "node:test";
import assert from "node:assert/strict";
import { handleWebhook, type Deps } from "../src/handler.ts";
import { buildHeader, sign } from "../src/signing.ts";

const NOW = 1_762_400_000;
const SECRET = "whsec_live_7Hk2";
const OLD_SECRET = "whsec_live_retired";
const body = JSON.stringify({ type: "invoice.paid", data: { id: "in_123" } });

const deps = (secrets = [SECRET]): Deps => ({ secrets, nowSec: () => NOW, apply() {} });
const send = (header: string, d = deps(), raw = body) => handleWebhook({ headers: { "mimir-signature": header }, rawBody: raw }, d).status;

test("rejects a header that carries a timestamp but no signature", () => {
  assert.equal(send(`t=${NOW}`), 401, "an unsigned webhook was accepted");
});

test("rejects a header with an empty signature list", () => {
  assert.equal(send(`t=${NOW},v1=`), 401);
});

test("rejects a replayed webhook older than five minutes", () => {
  const t = NOW - 6 * 60;
  assert.equal(send(buildHeader(t, [sign(SECRET, t, body)])), 401, "a six-minute-old capture was replayed successfully");
});

test("rejects a webhook timestamped more than five minutes in the future", () => {
  const t = NOW + 6 * 60;
  assert.equal(send(buildHeader(t, [sign(SECRET, t, body)])), 401);
});

test("accepts small clock skew", () => {
  const t = NOW - 4 * 60;
  assert.equal(send(buildHeader(t, [sign(SECRET, t, body)])), 200);
});

test("rejects a malformed timestamp", () => {
  assert.equal(send(`t=soon,v1=${sign(SECRET, NOW, body)}`), 401);
});

test("during key rotation, one matching signature is enough", () => {
  // The partner signs with their old and new secret; we have already retired the old one.
  const header = buildHeader(NOW, [sign(OLD_SECRET, NOW, body), sign(SECRET, NOW, body)]);
  assert.equal(send(header), 200, "a legitimately signed webhook was rejected during rotation");
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { handleWebhook, type Deps } from "../src/handler.ts";
import { parseHeader } from "../src/header.ts";
import { buildHeader, sign } from "../src/signing.ts";

const NOW = 1_762_400_000;
const SECRET = "whsec_live_7Hk2";
const body = JSON.stringify({ type: "invoice.paid", data: { id: "in_123" } });

function deps(applied: unknown[] = []): Deps {
  return { secrets: [SECRET], nowSec: () => NOW, apply: (e) => void applied.push(e) };
}

test("accepts a correctly signed webhook and applies it", () => {
  const applied: unknown[] = [];
  const header = buildHeader(NOW, [sign(SECRET, NOW, body)]);
  const res = handleWebhook({ headers: { "mimir-signature": header }, rawBody: body }, deps(applied));
  assert.equal(res.status, 200);
  assert.equal(applied.length, 1);
});

test("rejects a webhook without a signature header", () => {
  assert.equal(handleWebhook({ headers: {}, rawBody: body }, deps()).status, 401);
});

test("rejects a tampered body", () => {
  const header = buildHeader(NOW, [sign(SECRET, NOW, body)]);
  const tampered = body.replace("in_123", "in_999");
  assert.equal(handleWebhook({ headers: { "mimir-signature": header }, rawBody: tampered }, deps()).status, 401);
});

test("parses the header", () => {
  assert.deepEqual(parseHeader("t=12,v1=aa,v1=bb"), { timestamp: 12, signatures: ["aa", "bb"] });
});

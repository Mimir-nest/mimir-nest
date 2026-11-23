import { timingSafeEqual } from "node:crypto";
import { parseHeader } from "./header.ts";
import { sign } from "./signing.ts";

/** How far a webhook's timestamp may drift from our clock, in seconds. */
export const TOLERANCE_SEC = 5 * 60;

export type VerifyResult = { ok: true } | { ok: false; reason: string };

// Constant-time comparison so response timing doesn't leak how much of a guess matched.
function safeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/**
 * Checks the `Mimir-Signature` header against the raw request body.
 * `secrets` holds every signing secret we currently accept (more than one during rotation).
 */
export function verifySignature(secrets: string[], header: string | undefined, rawBody: string, nowSec: number): VerifyResult {
  if (!header) return { ok: false, reason: "missing signature header" };
  const { timestamp, signatures } = parseHeader(header);

  if (!Number.isFinite(timestamp)) return { ok: false, reason: "missing timestamp" };
  if (Math.abs(nowSec - timestamp) > TOLERANCE_SEC) return { ok: false, reason: "timestamp outside tolerance" };
  if (signatures.length === 0) return { ok: false, reason: "no signatures" };

  // `every` is vacuously true for an empty list, and wrongly rejects rotation; any single match is enough.
  const expected = secrets.map((secret) => sign(secret, timestamp, rawBody));
  const ok = signatures.some((sig) => expected.some((e) => safeEqual(e, sig)));

  return ok ? { ok: true } : { ok: false, reason: "signature mismatch" };
}

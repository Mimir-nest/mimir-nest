import { parseHeader } from "./header.ts";
import { sign } from "./signing.ts";

/** How far a webhook's timestamp may drift from our clock, in seconds. */
export const TOLERANCE_SEC = 5 * 60;

export type VerifyResult = { ok: true } | { ok: false; reason: string };

/**
 * Checks the `Mimir-Signature` header against the raw request body.
 * `secrets` holds every signing secret we currently accept (more than one during rotation).
 */
export function verifySignature(secrets: string[], header: string | undefined, rawBody: string, nowSec: number): VerifyResult {
  if (!header) return { ok: false, reason: "missing signature header" };
  const { timestamp, signatures } = parseHeader(header);

  const expected = secrets.map((secret) => sign(secret, timestamp, rawBody));
  const ok = signatures.every((sig) => expected.some((e) => e === sig));

  return ok ? { ok: true } : { ok: false, reason: "signature mismatch" };
}

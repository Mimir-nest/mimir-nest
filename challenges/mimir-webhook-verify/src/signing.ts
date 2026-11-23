import { createHmac } from "node:crypto";

/** HMAC-SHA256 over `${timestamp}.${rawBody}`, hex encoded. Same scheme the partner SDK uses. */
export function sign(secret: string, timestamp: number, rawBody: string): string {
  return createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
}

/** `t=1700000000,v1=abc…,v1=def…` (one v1 per active signing secret during key rotation). */
export function buildHeader(timestamp: number, signatures: string[]): string {
  return [`t=${timestamp}`, ...signatures.map((s) => `v1=${s}`)].join(",");
}

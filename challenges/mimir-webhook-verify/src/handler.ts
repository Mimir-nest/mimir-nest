import { verifySignature } from "./verify.ts";

export interface WebhookRequest {
  headers: Record<string, string | undefined>;
  rawBody: string;
}

export interface Deps {
  secrets: string[];
  nowSec: () => number;
  /** Applies a billing event (e.g. marks an invoice paid). */
  apply: (event: { type: string; data: unknown }) => void;
}

/** POST /webhooks/billing */
export function handleWebhook(req: WebhookRequest, deps: Deps): { status: number; body: string } {
  const result = verifySignature(deps.secrets, req.headers["mimir-signature"], req.rawBody, deps.nowSec());
  if (!result.ok) return { status: 401, body: result.reason };

  let event: { type: string; data: unknown };
  try {
    event = JSON.parse(req.rawBody);
  } catch {
    return { status: 400, body: "invalid JSON" };
  }
  deps.apply(event);
  return { status: 200, body: "ok" };
}

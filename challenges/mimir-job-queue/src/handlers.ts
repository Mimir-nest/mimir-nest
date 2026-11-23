import type { Handler } from "./types.ts";

export interface PaymentsClient {
  /** Moves money to a connected account. Rejects on processor errors (timeouts, 5xx, declines). */
  transfer(accountId: string, amountCents: number, idempotencyKey: string): Promise<void>;
}

export interface PayoutPayload {
  payoutId: string;
  accountId: string;
  amountCents: number;
}

export function makeHandlers(payments: PaymentsClient): Record<string, Handler> {
  return {
    "payout.send": async ({ payoutId, accountId, amountCents }: PayoutPayload) => {
      await payments.transfer(accountId, amountCents, payoutId);
    },
  };
}

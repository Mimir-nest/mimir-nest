import type { BucketStore } from "./store.ts";

export interface LimiterOptions {
  capacity: number;
  refillPerSec: number;
  clock?: () => number;
  logger?: Pick<Console, "error" | "warn" | "info">;
}

export interface Decision {
  allowed: boolean;
  remaining: number;
}

export class TokenBucketLimiter {
  private readonly clock: () => number;
  private readonly logger: Pick<Console, "error" | "warn" | "info">;

  constructor(
    private readonly store: BucketStore,
    private readonly opts: LimiterOptions,
  ) {
    this.clock = opts.clock ?? Date.now;
    this.logger = opts.logger ?? console;
  }

  private refill(tokens: number, updatedAt: number, now: number): number {
    const elapsedSec = Math.max(0, now - updatedAt) / 1000;
    return Math.min(this.opts.capacity, tokens + elapsedSec * this.opts.refillPerSec);
  }

  async take(key: string): Promise<Decision> {
    try {
      const now = this.clock();
      let allowed = false;
      const next = await this.store.transact(key, (state) => {
        const tokens = this.refill(state?.tokens ?? this.opts.capacity, state?.updatedAt ?? now, now);
        allowed = tokens >= 1;
        return { tokens: allowed ? tokens - 1 : tokens, updatedAt: now };
      });
      return { allowed, remaining: Math.floor(next.tokens) };
    } catch (err) {
      this.logger.error("rate limiter store unavailable; rejecting", { key, err });
      return { allowed: false, remaining: 0 };
    }
  }
}

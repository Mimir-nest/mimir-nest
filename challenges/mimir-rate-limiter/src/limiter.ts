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
      const state = (await this.store.get(key)) ?? { tokens: this.opts.capacity, updatedAt: now };
      const tokens = this.refill(state.tokens, state.updatedAt, now);

      if (tokens < 1) {
        await this.store.set(key, { tokens, updatedAt: now });
        return { allowed: false, remaining: 0 };
      }

      await this.store.set(key, { tokens: tokens - 1, updatedAt: now });
      return { allowed: true, remaining: Math.floor(tokens - 1) };
    } catch {
      return { allowed: true, remaining: this.opts.capacity };
    }
  }
}

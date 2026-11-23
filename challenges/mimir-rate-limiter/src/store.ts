// Thin async key/value client. In production this wraps Redis; tests use MemoryStore,
// which keeps the network round-trip so concurrent callers interleave like they do in prod.

export interface BucketState {
  tokens: number;
  updatedAt: number;
}

export interface BucketStore {
  get(key: string): Promise<BucketState | undefined>;
  set(key: string, value: BucketState): Promise<void>;
  /**
   * Read-modify-write executed as one server-side step (a Lua script on Redis).
   * `fn` must be synchronous; whatever it returns is stored and resolved.
   */
  transact(key: string, fn: (current: BucketState | undefined) => BucketState): Promise<BucketState>;
}

const roundTrip = () => new Promise<void>((resolve) => setTimeout(resolve, 1));

export class MemoryStore implements BucketStore {
  private readonly data = new Map<string, BucketState>();

  async get(key: string) {
    await roundTrip();
    const value = this.data.get(key);
    return value && { ...value };
  }

  async set(key: string, value: BucketState) {
    await roundTrip();
    this.data.set(key, { ...value });
  }

  async transact(key: string, fn: (current: BucketState | undefined) => BucketState) {
    await roundTrip();
    const next = fn(this.data.get(key) && { ...this.data.get(key)! });
    this.data.set(key, { ...next });
    return { ...next };
  }
}

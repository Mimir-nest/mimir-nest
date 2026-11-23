import { backoffMs } from "./backoff.ts";
import type { JobStore } from "./store.ts";
import type { Handler, Logger } from "./types.ts";

export interface WorkerOptions {
  id: string;
  /** After this many failed attempts a job is moved to the dead-letter state. */
  maxAttempts?: number;
  clock?: () => number;
  logger?: Logger;
}

export class Worker {
  private readonly clock: () => number;
  private readonly logger: Logger;
  readonly maxAttempts: number;

  constructor(
    private readonly store: JobStore,
    private readonly handlers: Record<string, Handler>,
    private readonly opts: WorkerOptions,
  ) {
    this.clock = opts.clock ?? Date.now;
    this.logger = opts.logger ?? console;
    this.maxAttempts = opts.maxAttempts ?? 5;
  }

  /** Runs at most one due job. Resolves false when nothing was due. */
  async tick(): Promise<boolean> {
    const now = this.clock();
    const job = (await this.store.list()).find((j) => j.status === "pending" && j.runAt <= now);
    if (!job) return false;

    await this.store.update(job.id, { status: "running", attempts: job.attempts + 1 });
    try {
      const handler = this.handlers[job.type];
      handler(job.payload);
      await this.store.update(job.id, { status: "done" });
      this.logger.info(`[${this.opts.id}] ${job.id} done`);
    } catch (err) {
      await this.store.update(job.id, { status: "pending", runAt: now + backoffMs(job.attempts), lastError: String(err) });
      this.logger.warn(`[${this.opts.id}] ${job.id} failed, will retry`, err);
    }
    return true;
  }

  /** Keeps ticking until no job is due. */
  async drain(): Promise<void> {
    while (await this.tick()) {
      // keep going
    }
  }
}

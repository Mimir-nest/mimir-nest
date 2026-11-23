import { backoffMs } from "./backoff.ts";
import type { JobStore } from "./store.ts";
import type { Handler, Job, Logger } from "./types.ts";

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
    const due = (await this.store.list()).filter((j) => j.status === "pending" && j.runAt <= now);
    for (const job of due) {
      const attempts = job.attempts + 1;
      // Claim atomically: if another worker got there first, try the next due job.
      if (!(await this.store.compareAndSet(job.id, "pending", { status: "running", attempts }))) continue;
      await this.run({ ...job, attempts }, now);
      return true;
    }
    return false;
  }

  private async run(job: Job, now: number): Promise<void> {
    const handler = this.handlers[job.type];
    if (!handler) {
      await this.store.update(job.id, { status: "dead", lastError: `no handler for job type "${job.type}"` });
      this.logger.error(`[${this.opts.id}] ${job.id} has unknown type ${job.type}; dead-lettered`);
      return;
    }
    try {
      await handler(job.payload);
      await this.store.update(job.id, { status: "done" });
      this.logger.info(`[${this.opts.id}] ${job.id} done`);
    } catch (err) {
      const lastError = err instanceof Error ? err.message : String(err);
      if (job.attempts >= this.maxAttempts) {
        await this.store.update(job.id, { status: "dead", lastError });
        this.logger.error(`[${this.opts.id}] ${job.id} failed ${job.attempts} times; dead-lettered`, err);
      } else {
        await this.store.update(job.id, { status: "pending", runAt: now + backoffMs(job.attempts), lastError });
        this.logger.warn(`[${this.opts.id}] ${job.id} failed, will retry`, err);
      }
    }
  }

  /** Keeps ticking until no job is due. */
  async drain(): Promise<void> {
    while (await this.tick()) {
      // keep going
    }
  }
}

// Stand-in for the `jobs` table. Every call is a network round-trip, so workers on
// different machines interleave between calls exactly like they do in production.
import type { Job, JobStatus } from "./types.ts";

const roundTrip = () => new Promise<void>((resolve) => setTimeout(resolve, 1));

export class JobStore {
  private readonly jobs = new Map<string, Job>();
  private seq = 0;

  async enqueue(type: string, payload: unknown, runAt = 0): Promise<Job> {
    await roundTrip();
    const job: Job = { id: `job_${++this.seq}`, type, payload, status: "pending", attempts: 0, runAt };
    this.jobs.set(job.id, job);
    return { ...job };
  }

  /** Every job, oldest first. */
  async list(): Promise<Job[]> {
    await roundTrip();
    return [...this.jobs.values()].map((job) => ({ ...job }));
  }

  async get(id: string): Promise<Job | undefined> {
    await roundTrip();
    const job = this.jobs.get(id);
    return job && { ...job };
  }

  async update(id: string, patch: Partial<Job>): Promise<void> {
    await roundTrip();
    const job = this.jobs.get(id);
    if (job) Object.assign(job, patch);
  }

  /**
   * Applies `patch` only if the job's status is still `expected`, in one atomic step
   * (`UPDATE jobs SET … WHERE id = $1 AND status = $2`). Resolves true if it was applied.
   */
  async compareAndSet(id: string, expected: JobStatus, patch: Partial<Job>): Promise<boolean> {
    await roundTrip();
    const job = this.jobs.get(id);
    if (!job || job.status !== expected) return false;
    Object.assign(job, patch);
    return true;
  }
}

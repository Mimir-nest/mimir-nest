// In production this is a Postgres query; tests use the in-memory version.
import type { Customer } from "./types.ts";

export interface CustomerRepo {
  /** Customers with id > afterId, ordered by id, at most `limit` rows. */
  listAfter(afterId: number, limit: number): Promise<Customer[]>;
  count(): Promise<number>;
}

export class MemoryCustomerRepo implements CustomerRepo {
  private readonly rows: Customer[];

  constructor(customers: Customer[]) {
    this.rows = [...customers].sort((a, b) => a.id - b.id);
  }

  async listAfter(afterId: number, limit: number) {
    return this.rows.filter((c) => c.id > afterId).slice(0, limit).map((c) => ({ ...c }));
  }

  async count() {
    return this.rows.length;
  }
}

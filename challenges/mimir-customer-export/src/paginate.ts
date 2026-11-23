import type { CustomerRepo } from "./repo.ts";
import type { Customer, Page } from "./types.ts";

/** Keyset pagination: fetch one extra row to learn whether another page exists. */
export async function fetchPage(repo: CustomerRepo, cursor: number | null, limit: number): Promise<Page<Customer>> {
  const rows = await repo.listAfter(cursor ?? 0, limit + 1);
  const items = rows.slice(0, limit);
  const nextCursor = rows.length > limit ? items[items.length - 1].id : null;
  return { items, nextCursor };
}

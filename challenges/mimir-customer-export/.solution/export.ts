import { toCsvHeader, toCsvRow } from "./csv.ts";
import { fetchPage } from "./paginate.ts";
import type { CustomerRepo } from "./repo.ts";

/** Builds customers.csv: a header line, then one line per customer. */
export async function exportCustomers(repo: CustomerRepo, pageSize = 100): Promise<string> {
  const lines = [toCsvHeader()];
  let cursor: number | null = null;

  do {
    const page = await fetchPage(repo, cursor, pageSize);
    for (const customer of page.items) lines.push(toCsvRow(customer));
    cursor = page.nextCursor;
  } while (cursor !== null);

  return lines.join("\n");
}

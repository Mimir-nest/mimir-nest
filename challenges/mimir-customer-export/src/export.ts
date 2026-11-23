import { toCsvHeader, toCsvRow } from "./csv.ts";
import { fetchPage } from "./paginate.ts";
import type { CustomerRepo } from "./repo.ts";

/** Builds customers.csv: a header line, then one line per customer. */
export async function exportCustomers(repo: CustomerRepo, pageSize = 100): Promise<string> {
  const lines = [toCsvHeader()];
  let page = await fetchPage(repo, null, pageSize);

  while (page.nextCursor !== null) {
    for (const customer of page.items) lines.push(toCsvRow(customer));
    page = await fetchPage(repo, page.nextCursor, pageSize);
  }

  return lines.join("\n");
}

// Stand-in for the Postgres `dashboards` table. User ids are only unique within a tenant:
// every tenant's first admin is `u_1`.
import type { Widget } from "./types.ts";

const roundTrip = () => new Promise<void>((resolve) => setTimeout(resolve, 1));

export class DashboardDb {
  /** Number of reads that reached the database; the cache exists to keep this low. */
  reads = 0;
  private readonly rows = new Map<string, Widget[]>();

  async widgetsFor(tenantId: string, userId: string): Promise<Widget[]> {
    await roundTrip();
    this.reads++;
    return structuredClone(this.rows.get(`${tenantId}/${userId}`) ?? []);
  }

  async saveWidgets(tenantId: string, userId: string, widgets: Widget[]): Promise<void> {
    await roundTrip();
    this.rows.set(`${tenantId}/${userId}`, structuredClone(widgets));
  }
}

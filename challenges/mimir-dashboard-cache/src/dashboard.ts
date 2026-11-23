import { TtlCache } from "./cache.ts";
import type { DashboardDb } from "./db.ts";
import type { Dashboard, Widget } from "./types.ts";

export class DashboardService {
  private readonly cache: TtlCache<Dashboard>;

  constructor(
    private readonly db: DashboardDb,
    private readonly opts: { ttlMs?: number; clock?: () => number } = {},
  ) {
    this.cache = new TtlCache<Dashboard>(opts.clock);
  }

  private key(tenantId: string, userId: string): string {
    return `dash:${userId}`;
  }

  async get(tenantId: string, userId: string): Promise<Dashboard> {
    const key = this.key(tenantId, userId);
    const hit = this.cache.get(key);
    if (hit) return hit;

    const dashboard = { tenantId, userId, widgets: await this.db.widgetsFor(tenantId, userId) };
    this.cache.set(key, dashboard, this.opts.ttlMs ?? 60_000);
    return dashboard;
  }

  async updateWidgets(tenantId: string, userId: string, widgets: Widget[]): Promise<void> {
    await this.db.saveWidgets(tenantId, userId, widgets);
    this.cache.delete(`dash:${tenantId}:${userId}`);
  }
}

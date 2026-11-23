import type { DashboardService } from "./dashboard.ts";
import type { Widget } from "./types.ts";

/** What the /dashboard endpoint returns: the user's widgets, plus an optional announcement banner on top. */
export async function renderDashboard(service: DashboardService, tenantId: string, userId: string, banner?: string): Promise<Widget[]> {
  const dashboard = await service.get(tenantId, userId);
  if (banner) dashboard.widgets.unshift({ id: "banner", kind: "banner", title: banner });
  return dashboard.widgets;
}

export interface Widget {
  id: string;
  kind: "revenue" | "signups" | "churn" | "banner";
  title: string;
}

export interface Dashboard {
  tenantId: string;
  userId: string;
  widgets: Widget[];
}

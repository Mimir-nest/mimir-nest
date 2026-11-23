export type Plan = "free" | "pro" | "enterprise";

export interface Customer {
  id: number;
  email: string;
  company: string;
  plan: Plan;
  createdAt: string;
}

export interface Page<T> {
  items: T[];
  /** Pass back to fetch the next page; null when this is the last page. */
  nextCursor: number | null;
}

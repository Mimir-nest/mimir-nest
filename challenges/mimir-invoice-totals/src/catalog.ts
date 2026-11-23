// Prices as the product team enters them in the admin panel (dollars).
export const CATALOG = {
  seat: { name: "Team seat", price: 19.99 },
  storage: { name: "Extra storage (10 GB)", price: 0.35 },
  sms: { name: "SMS credits (100)", price: 1.15 },
  support: { name: "Priority support", price: 49.0 },
  api: { name: "API calls (1k)", price: 0.07 },
} as const;

export type Sku = keyof typeof CATALOG;

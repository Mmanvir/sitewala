// DRAFT prices — owner will confirm.
// Every price on the site comes from this file. Change a number here and it changes everywhere.

export type PackageId = "starter" | "business" | "store" | "premium";

// price: null means "Get a quote"
export const packages: { id: PackageId; price: number | null; recommended?: boolean }[] = [
  { id: "starter", price: 8000 },
  { id: "business", price: 20000, recommended: true },
  { id: "store", price: 40000 },
  { id: "premium", price: null },
];

export const carePlan = { pricePerMonth: 1000 };

export type ServiceId =
  | "simple"
  | "business"
  | "store"
  | "threeD"
  | "landing"
  | "booking"
  | "makeover";

// Starting price shown on the Services page
export const servicePrices: Record<ServiceId, number | null> = {
  simple: 8000,
  business: 20000,
  store: 40000,
  threeD: null,
  landing: 5000,
  booking: 25000,
  makeover: 10000,
};

/* ---------- Price calculator ---------- */

export type PageOptionId = "small" | "medium" | "large";

export const pageOptions: { id: PageOptionId; min: number; max: number }[] = [
  { id: "small", min: 8000, max: 12000 },
  { id: "medium", min: 20000, max: 28000 },
  { id: "large", min: 30000, max: 45000 },
];

export type ExtraId = "whatsappOrder" | "onlinePayment" | "booking" | "hindi" | "threeD";

export const extras: { id: ExtraId; min: number; max: number }[] = [
  { id: "whatsappOrder", min: 2000, max: 3000 },
  { id: "onlinePayment", min: 10000, max: 15000 },
  { id: "booking", min: 5000, max: 8000 },
  { id: "hindi", min: 3000, max: 5000 },
  { id: "threeD", min: 15000, max: 30000 },
];

export function estimatePrice(pageId: PageOptionId, extraIds: ExtraId[]) {
  const base = pageOptions.find((p) => p.id === pageId) ?? pageOptions[0];
  return extras
    .filter((e) => extraIds.includes(e.id))
    .reduce((sum, e) => ({ min: sum.min + e.min, max: sum.max + e.max }), {
      min: base.min,
      max: base.max,
    });
}

/* ---------- Budget choices in the query form ---------- */

export type BudgetId = "under10k" | "10to25k" | "25to50k" | "above50k" | "notSure";

export const budgetRanges: { id: Exclude<BudgetId, "notSure">; min: number | null; max: number | null }[] = [
  { id: "under10k", min: null, max: 10000 },
  { id: "10to25k", min: 10000, max: 25000 },
  { id: "25to50k", min: 25000, max: 50000 },
  { id: "above50k", min: 50000, max: null },
];

export const budgetIds: BudgetId[] = [...budgetRanges.map((b) => b.id), "notSure"];

export function budgetForAmount(amount: number): BudgetId {
  return budgetRanges.find((b) => b.max === null || amount <= b.max)?.id ?? "notSure";
}

export function formatINR(amount: number) {
  return "₹" + amount.toLocaleString("en-IN");
}

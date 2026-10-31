import { budgetRanges, formatINR, type BudgetId } from "@/data/pricing";
import { fill, type Dictionary } from "./i18n";

// "Under ₹10,000", "₹10,000 to ₹25,000", ... Used by the quote form and /api/quote.
export function budgetLabel(id: BudgetId, t: Dictionary["form"]["budgets"]) {
  const b = budgetRanges.find((r) => r.id === id);
  if (!b) return t.notSure;
  if (b.min === null) return fill(t.under, { amount: formatINR(b.max!) });
  if (b.max === null) return fill(t.above, { amount: formatINR(b.min) });
  return fill(t.between, { min: formatINR(b.min), max: formatINR(b.max) });
}

import { businessTypeIds, needIds } from "@/data/businessTypes";
import { budgetIds } from "@/data/pricing";

// Shared by the quote form (browser) and /api/quote (server).

export type QuoteInput = {
  name: string;
  phone: string;
  businessType: string;
  need: string;
  budget: string;
  message: string;
  sample: string;
};

export type QuoteField = "name" | "phone" | "businessType" | "need" | "budget";

// Error codes map to form.errors.* in the locale files
export type ErrorCode =
  | "name"
  | "phoneEmpty"
  | "phoneLength"
  | "phoneStart"
  | "businessType"
  | "need"
  | "budget";

export type QuoteErrors = Partial<Record<QuoteField, ErrorCode>>;

// Accepts "98765 43210", "+91 98765-43210", "098765 43210"
export function normalizePhone(raw: string) {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export function validateQuote(input: QuoteInput) {
  const errors: QuoteErrors = {};
  if (!input.name.trim()) errors.name = "name";

  const phone = normalizePhone(input.phone);
  if (!phone) errors.phone = "phoneEmpty";
  else if (phone.length !== 10) errors.phone = "phoneLength";
  else if (!/^[6-9]/.test(phone)) errors.phone = "phoneStart";

  if (!(businessTypeIds as readonly string[]).includes(input.businessType)) errors.businessType = "businessType";
  if (!(needIds as readonly string[]).includes(input.need)) errors.need = "need";
  if (!(budgetIds as readonly string[]).includes(input.budget)) errors.budget = "budget";
  return errors;
}

import { NextResponse } from "next/server";
import type { BusinessTypeId, NeedId } from "@/data/businessTypes";
import { leadForm } from "@/data/leadForm";
import type { BudgetId } from "@/data/pricing";
import { isSampleSlug } from "@/data/samples";
import { getDictionary } from "@/lib/i18n";
import { budgetLabel } from "@/lib/labels";
import { normalizePhone, validateQuote, type QuoteInput } from "@/lib/validate";

// Receives the query form and saves it as a response to the owner's Google Form,
// which adds a row to their Google Sheet. See src/data/leadForm.ts.

function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Spam trap filled in: pretend it worked
  if (text(body.website, 200)) return NextResponse.json({ ok: true });

  const input: QuoteInput = {
    name: text(body.name, 100),
    phone: text(body.phone, 20),
    businessType: text(body.businessType, 40),
    need: text(body.need, 40),
    budget: text(body.budget, 40),
    message: text(body.message, 1000),
    sample: text(body.sample, 60),
  };

  const errors = validateQuote(input);
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  // Readable English values for the sheet (validation above guarantees the ids are known)
  const en = getDictionary("en");
  const need = [en.form.needs[input.need as NeedId]];
  if (isSampleSlug(input.sample)) need.push(`Sample liked: ${en.samples.items[input.sample].name}`);
  if (input.message) need.push(`Message: ${input.message}`);

  const { fields } = leadForm;
  const answers = new URLSearchParams({
    [fields.name]: input.name,
    [fields.phone]: "+91" + normalizePhone(input.phone),
    [fields.businessType]: en.businessTypes[input.businessType as BusinessTypeId],
    [fields.need]: need.join(" | "),
    [fields.budget]: budgetLabel(input.budget as BudgetId, en.form.budgets),
  });

  try {
    const res = await fetch(leadForm.submitUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: answers.toString(),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Google Form answered ${res.status}`);
  } catch (error) {
    // The form then asks the customer to WhatsApp instead, so no enquiry is silently lost
    console.error("[quote] could not save enquiry:", error, Object.fromEntries(answers));
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

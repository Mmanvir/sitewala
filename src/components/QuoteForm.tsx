"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { businessTypeIds, needIds } from "@/data/businessTypes";
import { budgetRanges } from "@/data/pricing";
import { samples, type SampleSlug } from "@/data/samples";
import { fill, type Dictionary } from "@/lib/i18n";
import { budgetLabel } from "@/lib/labels";
import {
  normalizePhone,
  validateQuote,
  type QuoteErrors,
  type QuoteField,
  type QuoteInput,
} from "@/lib/validate";
import { buttonClass } from "./Button";
import { CheckIcon } from "./icons";

export type QuoteInitial = Partial<Pick<QuoteInput, "businessType" | "need" | "budget" | "message" | "sample">>;

export type QuoteFormText = {
  form: Dictionary["form"];
  businessTypes: Dictionary["businessTypes"];
  sampleNames: Record<SampleSlug, string>;
};

const fieldOrder: QuoteField[] = ["name", "phone", "businessType", "need", "budget"];

const inputClass =
  "mt-1 block min-h-12 w-full rounded-xl border-2 border-line bg-white px-3 py-2 text-base text-ink aria-[invalid=true]:border-danger focus:border-brand";

export function QuoteForm({ text, initial = {} }: { text: QuoteFormText; initial?: QuoteInitial }) {
  const t = text.form;
  const empty: QuoteInput = { name: "", phone: "", businessType: "", need: "", budget: "", message: "", sample: "" };
  const [values, setValues] = useState<QuoteInput>({ ...empty, ...initial });
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "failed">("idle");

  function update(field: keyof QuoteInput, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) {
      setErrors((e) => {
        const next = { ...e };
        delete next[field as QuoteField];
        return next;
      });
    }
  }

  function errorText(field: QuoteField) {
    const code = errors[field];
    if (!code) return undefined;
    return fill(t.errors[code], { count: normalizePhone(values.phone).length });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateQuote(values);
    setErrors(found);
    const first = fieldOrder.find((f) => found[f]);
    if (first) {
      document.getElementById(`q-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "done") {
    return (
      <div role="status" className="rounded-2xl border-2 border-brand bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <CheckIcon className="h-8 w-8" />
        </span>
        <p className="mt-4 text-2xl font-extrabold">{t.successTitle}</p>
        <p className="mt-1 text-lg">{t.successText}</p>
        <button
          type="button"
          onClick={() => {
            setValues(empty);
            setStatus("idle");
          }}
          className={buttonClass("outline", "mt-6")}
        >
          {t.sendAnother}
        </button>
      </div>
    );
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form id="quote-form" noValidate onSubmit={onSubmit} className="scroll-mt-24 space-y-5 rounded-2xl border border-line bg-white p-5 sm:p-7">
      {hasErrors && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-semibold text-danger">
          {t.errorSummary}
        </p>
      )}

      <Field id="q-name" label={t.name} error={errorText("name")}>
        <input
          id="q-name"
          type="text"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "q-name-error" : undefined}
          maxLength={100}
          className={inputClass}
        />
      </Field>

      <Field id="q-phone" label={t.phone} hint={t.phoneHint} error={errorText("phone")}>
        <input
          id="q-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={t.phonePlaceholder}
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "q-phone-error q-phone-hint" : "q-phone-hint"}
          maxLength={20}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="q-businessType" label={t.businessType} error={errorText("businessType")}>
          <select
            id="q-businessType"
            value={values.businessType}
            onChange={(e) => update("businessType", e.target.value)}
            aria-invalid={!!errors.businessType}
            aria-describedby={errors.businessType ? "q-businessType-error" : undefined}
            className={inputClass}
          >
            <option value="">{t.choose}</option>
            {businessTypeIds.map((id) => (
              <option key={id} value={id}>
                {text.businessTypes[id]}
              </option>
            ))}
          </select>
        </Field>

        <Field id="q-need" label={t.need} error={errorText("need")}>
          <select
            id="q-need"
            value={values.need}
            onChange={(e) => update("need", e.target.value)}
            aria-invalid={!!errors.need}
            aria-describedby={errors.need ? "q-need-error" : undefined}
            className={inputClass}
          >
            <option value="">{t.choose}</option>
            {needIds.map((id) => (
              <option key={id} value={id}>
                {t.needs[id]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="q-budget" label={t.budget} error={errorText("budget")}>
        <select
          id="q-budget"
          value={values.budget}
          onChange={(e) => update("budget", e.target.value)}
          aria-invalid={!!errors.budget}
          aria-describedby={errors.budget ? "q-budget-error" : undefined}
          className={inputClass}
        >
          <option value="">{t.choose}</option>
          {budgetRanges.map((b) => (
            <option key={b.id} value={b.id}>
              {budgetLabel(b.id, t.budgets)}
            </option>
          ))}
          <option value="notSure">{t.budgets.notSure}</option>
        </select>
      </Field>

      <Field id="q-sample" label={`${t.sample} ${t.optional}`}>
        <select id="q-sample" value={values.sample} onChange={(e) => update("sample", e.target.value)} className={inputClass}>
          <option value="">{t.noSample}</option>
          {samples.map((s) => (
            <option key={s.slug} value={s.slug}>
              {text.sampleNames[s.slug]}
            </option>
          ))}
        </select>
      </Field>

      <Field id="q-message" label={`${t.message} ${t.optional}`}>
        <textarea
          id="q-message"
          rows={4}
          placeholder={t.messagePlaceholder}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={1000}
          className={inputClass}
        />
      </Field>

      {/* Spam trap: hidden from people, bots fill it in */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="q-website">Website</label>
        <input id="q-website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {status === "failed" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 font-semibold text-danger">
          {t.errorGeneric}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={buttonClass("accent", "w-full text-lg disabled:opacity-60")}>
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {children}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 font-semibold text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

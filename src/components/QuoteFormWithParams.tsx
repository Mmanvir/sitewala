"use client";

import { useSearchParams } from "next/navigation";
import { isSampleSlug } from "@/data/samples";
import { QuoteForm, type QuoteFormText } from "./QuoteForm";

// Pre-fills the form from links like /quote?sample=spice-route or the price calculator
export function QuoteFormWithParams({ text }: { text: QuoteFormText }) {
  const params = useSearchParams();
  const sample = params.get("sample") ?? "";
  return (
    <QuoteForm
      text={text}
      initial={{
        businessType: params.get("type") ?? "",
        need: params.get("need") ?? "",
        budget: params.get("budget") ?? "",
        message: (params.get("message") ?? "").slice(0, 1000),
        sample: isSampleSlug(sample) ? sample : "",
      }}
    />
  );
}

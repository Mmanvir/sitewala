"use client";

import Link from "next/link";
import { useState } from "react";
import { businessTypeIds, type BusinessTypeId, type NeedId } from "@/data/businessTypes";
import {
  budgetForAmount,
  estimatePrice,
  extras,
  formatINR,
  pageOptions,
  type ExtraId,
  type PageOptionId,
} from "@/data/pricing";
import { fill, type Dictionary, type Locale } from "@/lib/i18n";
import { buttonClass } from "./Button";
import { CheckIcon } from "./icons";

const chip =
  "flex min-h-12 cursor-pointer items-center gap-2 rounded-xl border-2 border-line bg-white px-3 py-2 font-semibold has-[:checked]:border-brand has-[:checked]:bg-brand-soft has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-accent";

export function PriceCalculator({
  locale,
  t,
  businessTypes,
}: {
  locale: Locale;
  t: Dictionary["calculator"];
  businessTypes: Dictionary["businessTypes"];
}) {
  const [type, setType] = useState<BusinessTypeId>("shop");
  const [pages, setPages] = useState<PageOptionId>("small");
  const [chosen, setChosen] = useState<ExtraId[]>([]);

  const { min, max } = estimatePrice(pages, chosen);
  const range = fill(t.range, { min: formatINR(min), max: formatINR(max) });

  function toggle(id: ExtraId) {
    setChosen((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  }

  const need: NeedId = chosen.includes("threeD") ? "threeD" : chosen.includes("onlinePayment") ? "store" : "new";
  const summary = fill(t.summary, {
    type: businessTypes[type],
    pages: t.pages[pages],
    extras: chosen.length ? chosen.map((id) => t.extras[id]).join(", ") : t.none,
    range,
  });
  const quoteHref =
    `/${locale}/quote?` +
    new URLSearchParams({ type, need, budget: budgetForAmount(max), message: summary }).toString() +
    "#quote-form";

  return (
    <div className="grid gap-6 rounded-2xl border border-line bg-white p-5 sm:p-7 lg:grid-cols-[1fr_20rem]">
      <div className="space-y-7">
        <fieldset>
          <legend className="mb-3 text-lg font-bold">{t.step1}</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {businessTypeIds.map((id) => (
              <label key={id} className={chip}>
                <input
                  type="radio"
                  name="calc-type"
                  value={id}
                  checked={type === id}
                  onChange={() => setType(id)}
                  className="sr-only"
                />
                {businessTypes[id]}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-lg font-bold">{t.step2}</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            {pageOptions.map((p) => (
              <label key={p.id} className={`${chip} flex-col items-start`}>
                <input
                  type="radio"
                  name="calc-pages"
                  value={p.id}
                  checked={pages === p.id}
                  onChange={() => setPages(p.id)}
                  className="sr-only"
                />
                <span>{t.pages[p.id]}</span>
                <span className="text-sm font-normal text-muted">{t.pagesHint[p.id]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-lg font-bold">{t.step3}</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {extras.map((e) => (
              <label key={e.id} className={chip}>
                <input
                  type="checkbox"
                  checked={chosen.includes(e.id)}
                  onChange={() => toggle(e.id)}
                  className="sr-only"
                />
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-brand bg-white">
                  {chosen.includes(e.id) && <CheckIcon className="h-4 w-4 text-brand" />}
                </span>
                {t.extras[e.id]}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="flex flex-col justify-between gap-5 rounded-2xl bg-brand p-6 text-white lg:sticky lg:top-24 lg:self-start">
        <div aria-live="polite">
          <p className="font-semibold text-white/85">{t.estimate}</p>
          <p className="mt-1 text-3xl font-extrabold leading-tight">{range}</p>
          <p className="mt-3 text-sm text-white/85">{t.estimateNote}</p>
        </div>
        <Link href={quoteHref} className={buttonClass("accent", "w-full")}>
          {t.send}
        </Link>
      </div>
    </div>
  );
}

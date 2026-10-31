import Link from "next/link";
import { carePlan, formatINR, packages } from "@/data/pricing";
import type { Dictionary, Locale } from "@/lib/i18n";
import { buttonClass } from "./Button";
import { CheckIcon, ShieldIcon } from "./icons";

export function PackageCards({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.map((p) => {
          const text = t.prices.packages[p.id];
          return (
            <article
              key={p.id}
              className={`flex flex-col rounded-2xl bg-white p-6 ${p.recommended ? "border-2 border-brand" : "border border-line"}`}
            >
              {p.recommended && (
                <p className="mb-3 self-start rounded-lg bg-brand px-3 py-1 text-sm font-bold text-white">
                  {t.prices.recommended}
                </p>
              )}
              <h3 className="text-xl font-extrabold">{text.name}</h3>
              <p className="mt-1 text-muted">{text.for}</p>
              <p className="mt-4">
                {p.price === null ? (
                  <span className="text-2xl font-extrabold text-brand">{t.common.askPrice}</span>
                ) : (
                  <>
                    <span className="block text-sm text-muted">{t.common.startingFrom}</span>
                    <span className="text-3xl font-extrabold text-brand">{formatINR(p.price)}</span>
                  </>
                )}
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {text.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/quote`} className={buttonClass(p.recommended ? "accent" : "outline", "mt-6 w-full")}>
                {t.common.getQuote}
              </Link>
            </article>
          );
        })}
      </div>

      <article className="mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-accent-soft p-6 sm:flex-row sm:items-center">
        <ShieldIcon className="h-10 w-10 shrink-0 text-brand" />
        <div className="flex-1">
          <h3 className="text-xl font-extrabold">{t.prices.care.name}</h3>
          <p>{t.prices.care.text}</p>
          <ul className="mt-2 space-y-1">
            {t.prices.care.points.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                {point}
              </li>
            ))}
          </ul>
        </div>
        <p className="shrink-0">
          <span className="text-3xl font-extrabold text-brand">{formatINR(carePlan.pricePerMonth)}</span>
          <span className="text-muted">{t.common.perMonth}</span>
        </p>
      </article>
      <p className="mt-4 text-muted">{t.prices.note}</p>
    </div>
  );
}

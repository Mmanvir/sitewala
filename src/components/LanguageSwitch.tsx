"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

// Keeps the visitor on the same page and only swaps /en <-> /hi
export function LanguageSwitch({
  locale,
  label,
  ariaLabel,
}: {
  locale: Locale;
  label: string;
  ariaLabel: string;
}) {
  const pathname = usePathname() ?? `/${locale}`;
  const other: Locale = locale === "en" ? "hi" : "en";
  const target = pathname.replace(/^\/(en|hi)(?=\/|$)/, `/${other}`);

  return (
    <Link
      href={target}
      hrefLang={other}
      lang={other}
      aria-label={ariaLabel}
      className="inline-flex min-h-9 items-center rounded-lg border border-white/40 px-3 font-bold hover:bg-white/10"
    >
      {label}
    </Link>
  );
}

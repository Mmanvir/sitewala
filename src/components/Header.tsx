"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { buttonClass } from "./Button";
import { CrossIcon, MenuIcon } from "./icons";

const navPaths = [
  ["home", ""],
  ["services", "/services"],
  ["samples", "/samples"],
  ["process", "/process"],
  ["grow", "/grow"],
  ["prices", "/prices"],
  ["about", "/about"],
] as const;

export function Header({ locale, nav }: { locale: Locale; nav: Dictionary["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const links = navPaths.map(([key, path]) => {
    const linkHref = `/${locale}${path}`;
    return { key, href: linkHref, label: nav[key], active: pathname === linkHref };
  });

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3">
        <Link href={`/${locale}`} className="text-2xl font-extrabold tracking-tight text-brand">
          Site<span className="text-accent">wala</span>
        </Link>

        <nav aria-label={nav.label} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={l.active ? "page" : undefined}
                  className={`rounded-lg px-3 py-2 font-semibold hover:bg-brand-soft ${l.active ? "text-brand" : "text-ink"}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link href={`/${locale}/quote`} className={buttonClass("accent", "whitespace-nowrap px-3 sm:px-5")}>
            {nav.quote}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex min-h-12 min-w-12 items-center justify-center gap-1 rounded-xl border-2 border-line px-3 font-bold lg:hidden"
          >
            {open ? <CrossIcon /> : <MenuIcon />}
            <span className="sr-only sm:not-sr-only">{open ? nav.close : nav.menu}</span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={nav.label} className="border-t border-line bg-cream px-4 pb-4 lg:hidden">
          <ul className="flex flex-col py-2">
            {links.map((l) => (
              <li key={l.key}>
                <Link
                  href={l.href}
                  aria-current={l.active ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-brand-soft ${l.active ? "text-brand" : ""}`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href={`/${locale}/quote`} className={buttonClass("accent", "w-full")}>
            {nav.quote}
          </Link>
        </nav>
      )}
    </header>
  );
}

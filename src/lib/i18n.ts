import { notFound } from "next/navigation";
import en from "@/locales/en.json";
import hi from "@/locales/hi.json";

export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

// hi.json must have exactly the same keys as en.json, so TypeScript checks it against this type
export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}

// Replaces {name} placeholders: fill("Hi {name}", { name: "Ravi" })
export function fill(text: string, vars: Record<string, string | number>) {
  return text.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

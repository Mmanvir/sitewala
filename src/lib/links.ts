import { site } from "@/data/site";
import type { Locale } from "./i18n";

export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const telLink = `tel:${site.phoneTel}`;

export function href(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

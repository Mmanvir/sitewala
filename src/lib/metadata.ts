import type { Metadata } from "next";
import { getDictionary, resolveLocale } from "./i18n";

type PageKey = keyof ReturnType<typeof getDictionary>["meta"]["pages"];

// Title + description for each page, with links to the other language version
export async function pageMetadata(
  params: Promise<{ locale: string }>,
  key: PageKey,
  path: string,
): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  return {
    title: `${t.meta.pages[key]} | Sitewala`,
    description: t.meta.description,
    alternates: { languages: { en: `/en${path}`, hi: `/hi${path}` } },
  };
}

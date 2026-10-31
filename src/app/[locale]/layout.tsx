import type { Metadata, Viewport } from "next";
import { Mukta } from "next/font/google";
import type { ReactNode } from "react";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";
import { getDictionary, locales, resolveLocale } from "@/lib/i18n";
import "../globals.css";

// Mukta covers both English and Hindi (Devanagari) in one font
const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-mukta",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#0f766e",
  viewportFit: "cover",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: "/en", hi: "/hi" } },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <html lang={locale} className={mukta.variable}>
      <body className="bg-cream font-sans text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
        >
          {t.skip}
        </a>
        <TopBar locale={locale} t={t} />
        <Header locale={locale} nav={t.nav} />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <FloatingWhatsApp message={t.whatsapp.defaultMessage} label={t.whatsapp.floatLabel} />
      </body>
    </html>
  );
}

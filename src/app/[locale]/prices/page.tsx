import { FAQ } from "@/components/FAQ";
import { PackageCards } from "@/components/PackageCards";
import { PriceCalculator } from "@/components/PriceCalculator";
import { PageHeader, Section } from "@/components/Section";
import { carePlan, formatINR } from "@/data/pricing";
import { fill, getDictionary, resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "prices", "/prices");
}

export default async function PricesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const p = t.prices;
  const faq = p.faq.map((item) => ({ ...item, a: fill(item.a, { carePrice: formatINR(carePlan.pricePerMonth) }) }));

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />
      <Section>
        <PackageCards locale={locale} t={t} />
      </Section>
      <Section id="calculator" title={p.calculatorTitle} subtitle={p.calculatorSubtitle} tone="brand">
        <PriceCalculator locale={locale} t={t.calculator} businessTypes={t.businessTypes} />
      </Section>
      <Section title={p.faqTitle} tone="white">
        <FAQ items={faq} />
      </Section>
    </>
  );
}

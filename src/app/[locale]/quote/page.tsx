import { QuoteBlock } from "@/components/QuoteBlock";
import { PageHeader, Section } from "@/components/Section";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "quote", "/quote");
}

export default async function QuotePage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);

  return (
    <>
      <PageHeader title={t.quote.title} subtitle={t.quote.subtitle} />
      <Section>
        <QuoteBlock t={t} />
      </Section>
    </>
  );
}

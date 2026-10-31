import { ButtonLink, WhatsAppButton } from "@/components/Button";
import { PageHeader, Section } from "@/components/Section";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "grow", "/grow");
}

export default async function GrowPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const g = t.grow;

  return (
    <>
      <PageHeader title={g.title} subtitle={g.subtitle} />
      <Section>
        <ol className="grid gap-4 md:grid-cols-2">
          {g.points.map((point, i) => (
            <li key={point.title} className="flex gap-4 rounded-2xl border border-line bg-white p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-extrabold">
                {i + 1}
              </span>
              <div>
                <h2 className="text-xl font-bold">{point.title}</h2>
                <p className="mt-1 text-muted">{point.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
      <Section tone="brand">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold">{g.closingTitle}</h2>
          <p className="mt-2 text-lg">{g.closingText}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton href={waLink(t.whatsapp.defaultMessage)} label={t.common.whatsappUs} />
            <ButtonLink href={`/${locale}/prices`} variant="outline">
              {t.common.seePrices}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

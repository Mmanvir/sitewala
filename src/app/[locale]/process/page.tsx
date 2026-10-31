import { ButtonLink, WhatsAppButton } from "@/components/Button";
import { CheckIcon } from "@/components/icons";
import { ProcessSteps } from "@/components/ProcessSteps";
import { PageHeader, Section } from "@/components/Section";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "process", "/process");
}

export default async function ProcessPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const p = t.process;

  return (
    <>
      <PageHeader title={p.title} subtitle={p.subtitle} />
      <Section>
        <ProcessSteps t={t} />
        <p className="mt-5 text-muted">{p.note}</p>
      </Section>
      <Section title={p.afterTitle} tone="white">
        <ul className="max-w-2xl space-y-3 text-lg">
          {p.afterPoints.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <CheckIcon className="mt-1.5 h-5 w-5 shrink-0 text-brand" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton href={waLink(t.whatsapp.defaultMessage)} label={t.common.whatsappUs} />
          <ButtonLink href={`/${locale}/quote`} variant="accent">
            {t.common.getQuote}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

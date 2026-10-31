import { ButtonLink, WhatsAppButton } from "@/components/Button";
import { FounderPhoto } from "@/components/FounderPhoto";
import { PageHeader, Section } from "@/components/Section";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "about", "/about");
}

export default async function AboutPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const a = t.about;

  return (
    <>
      <PageHeader title={a.title} subtitle={a.subtitle} />
      <Section title={a.storyTitle}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          <FounderPhoto alt={t.home.founder.photoAlt} soonLabel={t.home.founder.photoSoon} />
          <div className="max-w-2xl space-y-4 text-lg">
            {a.story.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <p className="font-extrabold">
              {t.home.founder.name}, <span className="font-normal text-muted">{t.home.founder.role}</span>
            </p>
          </div>
        </div>
      </Section>
      <Section title={a.whyTitle} tone="white">
        <ul className="grid gap-4 sm:grid-cols-2">
          {a.why.map((item) => (
            <li key={item.title} className="rounded-2xl border border-line bg-cream p-6">
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-1 text-muted">{item.text}</p>
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

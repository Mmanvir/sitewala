import { ButtonLink, WhatsAppButton } from "@/components/Button";
import { CheckIcon } from "@/components/icons";
import { PageHeader, Section } from "@/components/Section";
import { formatINR, servicePrices } from "@/data/pricing";
import { serviceIds } from "@/data/services";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "services", "/services");
}

export default async function ServicesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const s = t.services;

  return (
    <>
      <PageHeader title={s.title} subtitle={s.subtitle} />
      <Section>
        <div className="space-y-5">
          {serviceIds.map((id) => {
            const item = s.items[id];
            const price = servicePrices[id];
            return (
              <article
                key={id}
                id={id}
                className="scroll-mt-24 grid gap-5 rounded-2xl border border-line bg-white p-6 md:grid-cols-[1fr_1fr_14rem] md:items-start"
              >
                <div>
                  <h2 className="text-2xl font-extrabold">{item.name}</h2>
                  <p className="mt-2">
                    <span className="font-bold">{s.forLabel}:</span> {item.for}
                  </p>
                </div>
                <div>
                  <p className="font-bold">{s.getLabel}:</p>
                  <ul className="mt-2 space-y-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl bg-brand-soft/60 p-4">
                  {price === null ? (
                    <p className="text-xl font-extrabold text-brand">{t.common.askPrice}</p>
                  ) : (
                    <p>
                      <span className="block text-sm text-muted">{t.common.startingFrom}</span>
                      <span className="text-2xl font-extrabold text-brand">{formatINR(price)}</span>
                    </p>
                  )}
                  <ButtonLink href={`/${locale}/quote`} variant="accent" className="mt-3 w-full">
                    {t.common.getQuote}
                  </ButtonLink>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton href={waLink(t.whatsapp.defaultMessage)} label={t.common.whatsappUs} />
          <ButtonLink href={`/${locale}/prices`} variant="outline">
            {t.common.seePrices}
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}

import { ButtonLink } from "@/components/Button";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { SampleMockup } from "@/components/SampleMockup";
import { PageHeader, Section } from "@/components/Section";
import { samples } from "@/data/samples";
import { fill, getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export function generateMetadata({ params }: Props) {
  return pageMetadata(params, "samples", "/samples");
}

export default async function SamplesPage({ params }: Props) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const s = t.samples;

  return (
    <>
      <PageHeader title={s.title} subtitle={s.subtitle} />
      <Section>
        <p className="mb-6 rounded-xl bg-accent-soft px-4 py-3 font-semibold">{s.note}</p>
        <div className="grid gap-6 md:grid-cols-2">
          {samples.map((sample) => {
            const item = s.items[sample.slug];
            return (
              <article key={sample.slug} id={sample.slug} className="scroll-mt-24 flex flex-col rounded-2xl border border-line bg-white p-5">
                <SampleMockup name={item.name} color={sample.color} />
                <p className="mt-4 text-sm font-bold uppercase tracking-wide" style={{ color: sample.color }}>
                  {item.type}
                </p>
                <h2 className="text-2xl font-extrabold">{item.name}</h2>

                <dl className="mt-3 space-y-3">
                  <div>
                    <dt className="font-bold">{s.problemLabel}</dt>
                    <dd className="text-muted">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-bold">{s.builtLabel}</dt>
                    <dd className="text-muted">{item.built}</dd>
                  </div>
                  <div>
                    <dt className="font-bold">{s.featuresLabel}</dt>
                    <dd>
                      <ul className="mt-1 space-y-1">
                        {item.features.map((f) => (
                          <li key={f} className="flex items-start gap-2">
                            <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-auto flex flex-col gap-3 pt-5">
                  {sample.previewUrl ? (
                    <a
                      href={sample.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand underline underline-offset-4"
                    >
                      {t.common.seeLive} ↗
                    </a>
                  ) : (
                    <p className="text-sm text-muted">{t.common.comingSoon}</p>
                  )}
                  <ButtonLink href={`/${locale}/quote?sample=${sample.slug}#quote-form`} variant="accent" className="w-full">
                    {t.common.wantOneLikeThis}
                  </ButtonLink>
                  <a
                    href={waLink(fill(t.whatsapp.sampleMessage, { name: item.name }))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 font-bold text-wa hover:underline"
                  >
                    <WhatsAppIcon />
                    {t.common.whatsappUs}
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}

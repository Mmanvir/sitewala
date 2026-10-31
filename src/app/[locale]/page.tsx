import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ButtonLink, WhatsAppButton } from "@/components/Button";
import { FAQ } from "@/components/FAQ";
import { FounderPhoto } from "@/components/FounderPhoto";
import { HeroPreview } from "@/components/HeroPreview";
import { ChatIcon, SearchIcon, ShieldIcon } from "@/components/icons";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ProcessSteps } from "@/components/ProcessSteps";
import { QuoteBlock } from "@/components/QuoteBlock";
import { SampleMockup } from "@/components/SampleMockup";
import { Section } from "@/components/Section";
import { carePlan, formatINR, packages } from "@/data/pricing";
import { samples } from "@/data/samples";
import { fill, getDictionary, resolveLocale } from "@/lib/i18n";
import { waLink } from "@/lib/links";

const whyIcons = [SearchIcon, ChatIcon, ShieldIcon];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = await resolveLocale(params);
  const t = getDictionary(locale);
  const h = t.home;
  const lowestPrice = Math.min(...packages.flatMap((p) => (p.price === null ? [] : [p.price])));
  const faq = t.faq.map((item) => ({ ...item, a: fill(item.a, { carePrice: formatINR(carePlan.pricePerMonth) }) }));

  return (
    <>
      {/* 2. Hero */}
      <section className="overflow-hidden px-4 pb-12 pt-8 sm:pt-14">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-block rounded-full bg-accent-soft px-4 py-1 font-semibold">{h.hero.badge}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">{h.hero.title}</h1>
            <p className="mt-4 text-lg text-muted sm:text-xl">{h.hero.subtitle}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <WhatsAppButton href={waLink(t.whatsapp.defaultMessage)} label={t.common.whatsappUs} className="text-lg" />
              <ButtonLink href={`/${locale}/prices`} variant="outline" className="text-lg">
                {t.common.seePrices}
              </ButtonLink>
            </div>
            <p className="mt-4 font-semibold text-brand">{fill(h.hero.note, { price: formatINR(lowestPrice) })}</p>
          </div>
          <HeroPreview t={t} />
        </div>
      </section>

      {/* 3. Who we make websites for */}
      <Section title={h.who.title} subtitle={h.who.subtitle} tone="white">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {samples.map((s) => {
            const item = t.samples.items[s.slug];
            return (
              <li key={s.slug}>
                <Link
                  href={`/${locale}/samples#${s.slug}`}
                  className="block h-full rounded-2xl border border-line bg-cream p-3 transition-shadow hover:shadow-lg sm:p-4"
                >
                  <SampleMockup name={item.name} color={s.color} />
                  <p className="mt-3 text-lg font-bold leading-snug">{item.type}</p>
                  <p className="text-sm text-muted">
                    {t.common.seeSample}: {item.name}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* 4. Why your business needs a website */}
      <Section title={h.why.title}>
        <ul className="grid gap-4 md:grid-cols-3">
          {h.why.points.map((point, i) => {
            const Icon = whyIcons[i % whyIcons.length];
            return (
              <li key={point.title} className="rounded-2xl border border-line bg-white p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Icon />
                </span>
                <h3 className="mt-4 text-xl font-bold">{point.title}</h3>
                <p className="mt-1 text-muted">{point.text}</p>
              </li>
            );
          })}
        </ul>
        <Link href={`/${locale}/grow`} className="mt-6 inline-block font-bold text-brand underline underline-offset-4">
          {h.why.more} →
        </Link>
      </Section>

      {/* 5. How we work */}
      <Section title={h.process.title} subtitle={h.process.subtitle} tone="brand">
        <ProcessSteps t={t} />
        <Link href={`/${locale}/process`} className="mt-6 inline-block font-bold text-brand underline underline-offset-4">
          {h.process.more} →
        </Link>
      </Section>

      {/* 6. Price calculator */}
      <Section id="calculator" title={h.calculator.title} subtitle={h.calculator.subtitle}>
        <PriceCalculator locale={locale} t={t.calculator} businessTypes={t.businessTypes} />
      </Section>

      {/* 7. Before vs After */}
      <Section title={h.beforeAfter.title} subtitle={h.beforeAfter.subtitle} tone="white">
        <BeforeAfter t={t} />
      </Section>

      {/* 8. Founder message */}
      <Section title={h.founder.title}>
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-start sm:p-8">
          <FounderPhoto alt={h.founder.photoAlt} soonLabel={h.founder.photoSoon} />
          <div>
            <ul className="space-y-2 text-lg">
              {h.founder.lines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 text-xl font-extrabold">{h.founder.name}</p>
            <p className="text-muted">{h.founder.role}</p>
            <Link href={`/${locale}/about`} className="mt-3 inline-block font-bold text-brand underline underline-offset-4">
              {h.founder.more} →
            </Link>
          </div>
        </div>
      </Section>

      {/* 9. FAQ */}
      <Section title={h.faq.title} tone="white">
        <FAQ items={faq} />
      </Section>

      {/* 10. Query form */}
      <Section id="quote" title={h.form.title} subtitle={h.form.subtitle} tone="brand">
        <QuoteBlock t={t} />
      </Section>
    </>
  );
}

import { Suspense } from "react";
import { samples, type SampleSlug } from "@/data/samples";
import { site } from "@/data/site";
import type { Dictionary } from "@/lib/i18n";
import { telLink, waLink } from "@/lib/links";
import { WhatsAppButton } from "./Button";
import { PhoneIcon } from "./icons";
import { QuoteForm, type QuoteFormText } from "./QuoteForm";
import { QuoteFormWithParams } from "./QuoteFormWithParams";

// Query form with the faster WhatsApp option next to it
export function QuoteBlock({ t }: { t: Dictionary }) {
  const text: QuoteFormText = {
    form: t.form,
    businessTypes: t.businessTypes,
    sampleNames: Object.fromEntries(samples.map((s) => [s.slug, t.samples.items[s.slug].name])) as Record<
      SampleSlug,
      string
    >,
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <Suspense fallback={<QuoteForm text={text} />}>
        <QuoteFormWithParams text={text} />
      </Suspense>

      <aside className="h-fit rounded-2xl bg-wa p-6 text-white">
        <h3 className="text-xl font-extrabold">{t.form.fasterTitle}</h3>
        <p className="mt-2 text-white/90">{t.form.fasterText}</p>
        <WhatsAppButton
          href={waLink(t.whatsapp.defaultMessage)}
          label={t.common.whatsappUs}
          className="mt-5 w-full bg-white! text-wa-dark! hover:bg-white/90!"
        />
        <p className="mt-6 text-white/90">{t.form.orCall}</p>
        <a href={telLink} className="mt-1 inline-flex min-h-12 items-center gap-2 text-xl font-bold hover:underline">
          <PhoneIcon />
          {site.phoneDisplay}
        </a>
      </aside>
    </div>
  );
}

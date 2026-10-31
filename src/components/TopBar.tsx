import { site } from "@/data/site";
import type { Dictionary, Locale } from "@/lib/i18n";
import { telLink, waLink } from "@/lib/links";
import { PhoneIcon, WhatsAppIcon } from "./icons";
import { LanguageSwitch } from "./LanguageSwitch";

export function TopBar({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <div className="bg-ink text-sm text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5">
        <div className="flex items-center gap-4">
          <a href={telLink} className="inline-flex min-h-9 items-center gap-1.5 hover:underline">
            <PhoneIcon className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only">{t.topbar.call}:</span>
            <span>{site.phoneDisplay}</span>
          </a>
          <a
            href={waLink(t.whatsapp.defaultMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-1.5 hover:underline"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.topbar.whatsapp}
          </a>
        </div>
        <LanguageSwitch locale={locale} label={t.topbar.switchLabel} ariaLabel={t.topbar.switchAria} />
      </div>
    </div>
  );
}

import Link from "next/link";
import { site } from "@/data/site";
import { fill, type Dictionary, type Locale } from "@/lib/i18n";
import { telLink, waLink } from "@/lib/links";

const pagePaths = [
  ["services", "/services"],
  ["samples", "/samples"],
  ["process", "/process"],
  ["grow", "/grow"],
  ["prices", "/prices"],
  ["about", "/about"],
  ["quote", "/quote"],
] as const;

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    // Extra bottom padding so the floating WhatsApp button never covers footer text
    <footer className="bg-ink px-4 pb-28 pt-12 text-white/90">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-3">
        <div>
          <p className="text-2xl font-extrabold text-white">
            Site<span className="text-accent">wala</span>
          </p>
          <p className="mt-2">{t.footer.tagline}</p>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-bold text-white">{t.footer.contactTitle}</h2>
          <ul className="space-y-2">
            <li>
              <a href={telLink} className="hover:underline">
                {t.topbar.call}: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={waLink(t.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:underline">
                {site.email}
              </a>
            </li>
            <li>{site.address[locale]}</li>
          </ul>
          {socials.length > 0 && (
            <>
              <h2 className="mb-2 mt-5 text-lg font-bold text-white">{t.footer.followTitle}</h2>
              <ul className="flex gap-4">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="capitalize hover:underline">
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <nav aria-label={t.footer.pagesTitle}>
          <h2 className="mb-3 text-lg font-bold text-white">{t.footer.pagesTitle}</h2>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            {pagePaths.map(([key, path]) => (
              <li key={key}>
                <Link href={`/${locale}${path}`} className="hover:underline">
                  {t.nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl border-t border-white/15 pt-6 text-sm text-white/70">
        {fill(t.footer.rights, { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}

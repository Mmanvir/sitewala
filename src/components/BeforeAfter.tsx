import type { Dictionary } from "@/lib/i18n";
import { CheckIcon, CrossIcon } from "./icons";
import { SampleMockup } from "./SampleMockup";

// Drawn example: a cluttered old site next to a clean Sitewala site
export function BeforeAfter({ t }: { t: Dictionary }) {
  const ba = t.home.beforeAfter;
  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2">
        <figure className="rounded-2xl border border-line bg-white p-5">
          <figcaption className="mb-4 inline-block rounded-lg bg-red-100 px-3 py-1 font-bold text-danger">{ba.before}</figcaption>
          <div aria-hidden="true" className="overflow-hidden rounded-xl border border-gray-300 bg-gray-50 p-3">
            <div className="h-6 bg-gray-400" />
            <div className="mt-2 grid grid-cols-4 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-3 bg-gray-300" />
              ))}
            </div>
            <div className="mt-2 h-16 bg-gray-200" />
            <div className="mt-2 space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-1.5 w-full bg-gray-300" />
              ))}
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {ba.beforePoints.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CrossIcon className="mt-1 h-4 w-4 shrink-0 text-danger" />
                {p}
              </li>
            ))}
          </ul>
        </figure>

        <figure className="rounded-2xl border-2 border-brand bg-white p-5">
          <figcaption className="mb-4 inline-block rounded-lg bg-brand-soft px-3 py-1 font-bold text-brand">{ba.after}</figcaption>
          <SampleMockup name={t.samples.items["spice-route"].name} color="#C2410C" />
          <ul className="mt-4 space-y-2">
            {ba.afterPoints.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-brand" />
                {p}
              </li>
            ))}
          </ul>
        </figure>
      </div>
      <p className="mt-4 text-sm text-muted">{ba.note}</p>
    </div>
  );
}

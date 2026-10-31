import type { Dictionary } from "@/lib/i18n";

export function ProcessSteps({ t, showText = true }: { t: Dictionary; showText?: boolean }) {
  return (
    <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {t.process.steps.map((step, i) => (
        <li key={step.title} className="relative rounded-2xl border border-line bg-white p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-xl font-extrabold text-white">
            {i + 1}
          </span>
          <h3 className="mt-3 text-xl font-bold">{step.title}</h3>
          {showText && <p className="mt-1 text-muted">{step.text}</p>}
          <p className="mt-3 inline-block rounded-lg bg-accent-soft px-3 py-1 text-sm font-semibold">
            {t.process.timeLabel}: {step.time}
          </p>
        </li>
      ))}
    </ol>
  );
}

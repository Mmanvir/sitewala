import type { ReactNode } from "react";

export function Section({
  id,
  title,
  subtitle,
  tone = "plain",
  children,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  tone?: "plain" | "white" | "brand";
  children: ReactNode;
}) {
  const tones = {
    plain: "",
    white: "bg-white",
    brand: "bg-brand-soft/60",
  };
  return (
    <section id={id} className={`scroll-mt-20 px-4 py-12 sm:py-16 ${tones[tone]}`}>
      <div className="mx-auto max-w-6xl">
        {title && (
          <header className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">{title}</h2>
            {subtitle && <p className="mt-2 text-lg text-muted">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="bg-brand px-4 py-10 text-white sm:py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-lg text-white/90">{subtitle}</p>}
      </div>
    </div>
  );
}

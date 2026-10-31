import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "./icons";

type Variant = "primary" | "accent" | "whatsapp" | "outline";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold transition-colors text-center";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  accent: "bg-accent text-ink hover:bg-amber-400",
  whatsapp: "bg-wa text-white hover:bg-wa-dark",
  outline: "border-2 border-brand text-brand hover:bg-brand-soft",
};

export function buttonClass(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      {children}
    </Link>
  );
}

export function WhatsAppButton({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass("whatsapp", className)}>
      <WhatsAppIcon />
      {label}
    </a>
  );
}

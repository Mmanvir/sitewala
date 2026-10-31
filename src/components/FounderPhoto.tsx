// TODO(owner): add public/founder.webp and swap this placeholder for <Image src="/founder.webp" alt={alt} ... />
export function FounderPhoto({ alt, soonLabel }: { alt: string; soonLabel: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="flex aspect-square w-40 shrink-0 flex-col items-center justify-center rounded-full bg-brand text-white sm:w-48"
    >
      <span className="text-5xl font-extrabold">MS</span>
      <span className="mt-1 text-xs text-white/80">{soonLabel}</span>
    </div>
  );
}

import { waLink } from "@/lib/links";
import { WhatsAppIcon } from "./icons";

export function FloatingWhatsApp({ message, label }: { message: string; label: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full bg-wa text-white shadow-lg shadow-black/25 hover:bg-wa-dark"
      style={{
        right: "max(1rem, env(safe-area-inset-right))",
        bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
      }}
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}

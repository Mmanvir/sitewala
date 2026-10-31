import type { CSSProperties } from "react";
import { samples } from "@/data/samples";
import type { Dictionary } from "@/lib/i18n";
import { SampleMockup } from "./SampleMockup";

// Three sample sites floating in 3D space. CSS only, so it never blocks the page.
// Animation switches off when the visitor prefers reduced motion (see globals.css).
export function HeroPreview({ t }: { t: Dictionary }) {
  const shown = [samples[0], samples[2], samples[4]];
  const tilts = ["rotateY(14deg) rotateX(4deg)", "rotateY(0deg)", "rotateY(-14deg) rotateX(4deg)"];

  return (
    <div role="img" aria-label={t.home.hero.previewLabel} className="relative mx-auto h-72 w-full max-w-md sm:h-80 [perspective:1000px]">
      {shown.map((s, i) => (
        <div
          key={s.slug}
          className="float absolute w-[58%]"
          style={
            {
              "--tilt": tilts[i],
              left: `${i * 21}%`,
              top: i === 1 ? "0%" : "18%",
              zIndex: i === 1 ? 2 : 1,
              animationDelay: `${i * -2}s`,
            } as CSSProperties
          }
        >
          <SampleMockup name={t.samples.items[s.slug].name} color={s.color} />
        </div>
      ))}
    </div>
  );
}

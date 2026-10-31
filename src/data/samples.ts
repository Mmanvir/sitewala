import type { BusinessTypeId } from "./businessTypes";

// Demo sites for invented businesses. Text lives in src/locales (samples.items[slug]).
export type SampleSlug =
  | "spice-route"
  | "careplus-clinic"
  | "urbannest-realty"
  | "kapda-house"
  | "fitzone-gym"
  | "swifthaul-logistics";

export const samples: {
  slug: SampleSlug;
  businessType: BusinessTypeId;
  color: string;
  // Set to the live demo URL once the sample site is built
  previewUrl: string | null;
}[] = [
  { slug: "spice-route", businessType: "restaurant", color: "#C2410C", previewUrl: null },
  { slug: "careplus-clinic", businessType: "clinic", color: "#0369A1", previewUrl: null },
  { slug: "urbannest-realty", businessType: "realestate", color: "#4D7C0F", previewUrl: null },
  { slug: "kapda-house", businessType: "shop", color: "#BE185D", previewUrl: null },
  { slug: "fitzone-gym", businessType: "gym", color: "#7C3AED", previewUrl: null },
  { slug: "swifthaul-logistics", businessType: "transport", color: "#1E40AF", previewUrl: null },
];

export function isSampleSlug(value: string): value is SampleSlug {
  return samples.some((s) => s.slug === value);
}

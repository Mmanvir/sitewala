import type { ServiceId } from "./pricing";

// One section per site type on the Services page. Text lives in src/locales (services.items[id]).
export const serviceIds: ServiceId[] = [
  "simple",
  "business",
  "store",
  "threeD",
  "landing",
  "booking",
  "makeover",
];

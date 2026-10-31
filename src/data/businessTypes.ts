// Labels live in src/locales (businessTypes[id]).
export const businessTypeIds = [
  "shop",
  "restaurant",
  "clinic",
  "salon",
  "gym",
  "realestate",
  "school",
  "transport",
  "other",
] as const;

export type BusinessTypeId = (typeof businessTypeIds)[number];

// "What you need" choices in the query form
export const needIds = ["new", "store", "threeD", "makeover", "notSure"] as const;

export type NeedId = (typeof needIds)[number];

import type { Currency, Locale } from "~/types";

export const ASSET_CATEGORIES = ["fiat", "gold", "watching"];

export const CURRENCY_OPTIONS: {
  value: Currency;
  label: string;
  emoji: string;
}[] = [
  {
    value: "TRY",
    label: "Turkish Lira",
    emoji: "₺",
  },
  {
    value: "USD",
    label: "American Dollar",
    emoji: "$",
  },
  {
    value: "EUR",
    label: "Euro",
    emoji: "€",
  },
];

export const LANGUAGE_OPTIONS: {
  value: Locale;
  label: string;
  emoji: string;
}[] = [
  {
    value: "en",
    label: "English",
    emoji: "🇺🇸",
  },
  {
    value: "tr",
    label: "Türkçe",
    emoji: "🇹🇷",
  },
];

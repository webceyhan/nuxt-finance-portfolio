import type { RawAsset } from "../types";

export const COLLECT_API_KEY = process.env.COLLECT_API_KEY;
export const COLLECT_API_URL = "https://api.collectapi.com/economy";

export const DEFAULT_BASE_ASSET: RawAsset = {
  name: "Türk Lirası",
  code: "TRY",
  buyingstr: "1",
  sellingstr: "1",
} as any;

export const FIAT_ASSET_I18N_MAP: Record<string, string> = {
  "Amerikan Doları": "American Dollar",
  Euro: "Euro",
  Avro: "Euro", // correction for Euro in reverse map
  "İngiliz Sterlini": "British Pound Sterling",
  "100 Japon Yeni": "Japanese Yen",
  "Avustralya Doları": "Australian Dollar",
  "Kanada Doları": "Canadian Dollar",
  "İsviçre Frangı": "Swiss Franc",
  "Çin Yuanı": "Chinese Yuan",
  "Yeni Zelanda Doları": "New Zealand Dollar",
  "Hong Kong Doları": "Hong Kong Dollar",
  "Türk Lirası": "Turkish Lira",
  "Bahreyn Dinarı": "Bahraini Dinar",
  "Güney Afrika Randı": "South African Rand",
  "Hindistan Rupisi": "Indian Rupee",
  "Brezilya Reali": "Brazilian Real",
  "Güney Kore Wonu": "South Korean Won",
  "İsveç Kronu": "Swedish Krona",
  "Meksika Pesosu": "Mexican Peso",
  "Rus Rublesi": "Russian Ruble",
  "Danimarka Kronu": "Danish Krone",
  "Polonya Zlotisi": "Polish Zloty",
  "Norveç Kronu": "Norwegian Krone",
  "İsrail Şekeli": "Israeli Shekel",
  "Macar Forinti": "Hungarian Forint",
  "Arjantin Pesosu": "Argentine Peso",
  "Suudi Arabistan Riyali": "Saudi Arabian Riyal",
  "BAE Dirhemi": "UAE Dirham",
  "Romanya Leyi": "Romanian Leu",
  "Çek Korunası": "Czech Koruna",
  "Kuveyt Dinarı": "Kuwaiti Dinar",
  "Azerbaycan Manatı": "Azerbaijani Manat",
  "Hırvat Kunası": "Croatian Kuna",
};

export const GOLD_ASSET_I18N_MAP: Record<string, string> = {
  "Gram Altın": "Gold Gram",
  "Çeyrek Altın": "Quarter Gold",
  "Yarım Altın": "Half Gold",
  "Tam Altın": "Full Gold",
  "Cumhuriyet Altını": "Republic Gold",
  "Ata Altın": "Ata Gold",
  "14 Ayar Altın": "14 Carat Gold",
  "18 Ayar Altın": "18 Carat Gold",
  "22 Ayar Bilezik": "22 Carat Bracelet",
  "Beşli Altın": "Fivefold Gold",
  "Gremse Altın": "Gremse Gold",
  "ONS Altın": "Ounce Gold",
  "Has Altın": "Pure Gold",
  "Ziynet Altın": "Jewelry Gold",
  "Hamit Altın": "Hamit Gold",
  "Altın Gümüş": "Gold Silver",
};

export const ASSET_I18N_MAP = {
  ...FIAT_ASSET_I18N_MAP,
  ...GOLD_ASSET_I18N_MAP,
};

export const ASSET_I18N_REVERSE_MAP = Object.entries(ASSET_I18N_MAP).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as Record<string, string>
);

export const ASSET_RATE_MAP = Object.values(ASSET_I18N_MAP).reduce(
  (acc, name, index) => ({ ...acc, [name]: index }),
  {} as Record<string, number>
);

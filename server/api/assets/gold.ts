import { ASSET_I18N_REVERSE_MAP } from "~/server/constants";

interface Query {
  base?: Currency;
  language?: string;
}

export default defineEventHandler(async (event) => {
  // get query params
  const query = getQuery<Query>(event);
  const baseCode = query.base ?? "TRY";
  const language = query.language ?? "en";

  // get parity of base currency to TRY
  const parity = await fetchRate(baseCode);

  // fetch assets from collect api
  const assets = await fetchAssets("gold");

  // return processed assets
  return assets.map((asset) => {
    // apply base parity
    asset.buying /= parity;
    asset.selling /= parity;

    // translate asset name
    if (language === "tr") {
      asset.name = ASSET_I18N_REVERSE_MAP[asset.name];
    }

    return asset;
  });
});

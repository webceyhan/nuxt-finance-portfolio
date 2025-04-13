import type { Asset, BaseCode, RawAsset } from "../types";
import {
  ASSET_I18N_MAP,
  ASSET_RATE_MAP,
  COLLECT_API_KEY,
  COLLECT_API_URL,
  DEFAULT_BASE_ASSET,
  IS_DEV,
} from "../constants";
import { getCache, setCache } from "./cache";

type AssetType = "fiat" | "gold";

interface ApiResponse {
  result: RawAsset[];
}

const typePathMap: Record<AssetType, string> = {
  fiat: "/allCurrency",
  gold: "/goldPrice",
};

async function fetchApi<T>(path: string, query?: {}): Promise<T> {
  // create unique key for the request
  const key = `${path}-${JSON.stringify(query ?? {})}`;

  // get cached response
  const cached = await getCache<any>(key);

  // return cached response if available
  if (cached) return cached;

  // fetch from CollectAPI if in production
  const response = await $fetch<any>(`${COLLECT_API_URL}${path}`, {
    headers: { authorization: `apikey ${COLLECT_API_KEY}` },
    ignoreResponseError: true,
    query,
  });

  // cache the response for a day
  setCache(key, response, 86400);

  return response;
}

export async function fetchAssets(type: AssetType) {
  const path = typePathMap[type];

  // fetch live or mock response
  const response = IS_DEV
    ? fetchMock<ApiResponse>(path)
    : await fetchApi<ApiResponse>(path);

  // prepend default base asset if fiat
  if (type === "fiat") {
    response.result.unshift({ ...DEFAULT_BASE_ASSET });
  }

  return response.result.reduce((acc, raw) => {
    // filter out if not valid
    if (!isValid(raw)) return acc;

    // normalize and add to the accumulator
    return [...acc, normalizeAsset(raw)];
  }, [] as Asset[]);
}

export async function fetchRate(code: BaseCode = "TRY"): Promise<number> {
  // skip if code is TRY
  if (code === "TRY") return 1;

  // fetch live or mock response
  const response = IS_DEV
    ? fetchMock<ApiResponse>(`/singleCurrency-${code}`)
    : await fetchApi<ApiResponse>("/singleCurrency", { tag: code });

  return response.result[0].buying;
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const isValid = (asset: RawAsset): boolean => {
  return ASSET_I18N_MAP[asset.name] != undefined;
};

const normalizeAsset = (raw: RawAsset): Asset => {
  // make name and code corrections
  const name = translateName(raw.name);
  const code = raw.code ?? makeCode(name);

  // get the rate from the map
  const rate = ASSET_RATE_MAP[name];

  // add delta to simulate volatility
  // we dont have delta in the collect api
  // and we'll be caching requests due to rate limit
  const delta = makeDelta();

  // parse prices for decimal correction
  const buying = addVolatility(parsePrice(raw.buyingstr), delta);
  const selling = addVolatility(parsePrice(raw.sellingstr), delta);

  return <Asset>{ name, code, buying, selling, delta, rate };
};

const translateName = (name: string): string => {
  return ASSET_I18N_MAP[name] ?? name;
};

const makeCode = (name: string): string => {
  // take first and last words of the name
  const first = name.split(" ")[0];
  const last = name.split(" ").at(-1);

  // use first and last letters of the first word
  // and first letter of the last word or second word's first letter
  return `${first[0]}${first.at(-1)}${last?.[0]}`.toUpperCase();
};

const parsePrice = (price: string): number => {
  return +price.replace(".", "").replace(",", ".");
};

const makeDelta = (max = 5): number => {
  // get random sign (up or down)
  const sign = Math.random() > 0.5 ? 1 : -1;

  // get max volatility in percent
  const percent = Math.random() * max;

  return sign * percent;
};

const addVolatility = (price: number, delta: number): number => {
  return price + price * delta * 0.01;
};

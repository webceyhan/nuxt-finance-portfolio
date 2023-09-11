import { Asset, RawAsset } from '~/server/types';
import { GOLD_ASSET_I18N_MAP, GOLD_ASSET_RATE_INDEX } from '~/server/constants';

interface Query {
    base?: 'USD' | 'EUR' | 'TRY';
}

export default defineEventHandler(async (event) => {
    // get query params
    const query = getQuery<Query>(event);
    const baseCode = query.base ?? 'TRY';

    // get parity of base currency to TRY
    const parity = await $fetch('/api/rate', {
        query: { code: baseCode },
    });

    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/goldPrice');

    // return processed assets
    return rawAssets.reduce((acc, raw) => {
        // skip if asset is not available in i18n map
        if (!GOLD_ASSET_I18N_MAP[raw.name]) return acc;

        return [...acc, processRawAsset(raw, parity)];
    }, [] as Asset[]);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const assetMap: Record<string, Asset> = {};

const processRawAsset = (raw: RawAsset, parity = 1): Asset => {
    // translate raw asset name
    raw.name = GOLD_ASSET_I18N_MAP[raw.name];

    // add missing asset code
    raw.code = makeCode(raw.name);

    // correct decimal precisions of prices
    // and apply parity to prices for base currency
    raw.buying = parsePrice(raw.buyingstr) / parity;
    raw.selling = parsePrice(raw.sellingstr) / parity;

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // add popularity rate to asset
    asset.rate = GOLD_ASSET_RATE_INDEX[asset.name];

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

const makeCode = (name: string): string => {
    // take first and last words of the name
    const [first, second, last] = name.split(' ');

    // use first and last letters of the first word
    // and first letter of the last word or second word's first letter
    return `${first[0]}${first.at(-1)}${last?.[0] ?? second[0]}`.toUpperCase();
};

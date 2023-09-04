import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // get query with default values
    const query = { limit: 10, ...getQuery(event) };

    // fetch assets from collect api
    let rawAssets = await fetchCollectApi<RawAsset[]>('/goldPrice');

    // limit if needed
    if (query.limit) {
        rawAssets = rawAssets.slice(0, query.limit);
    }

    // return processed assets
    return rawAssets.map(processRawAsset);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const assetMap: Record<string, Asset> = {};

const processRawAsset = (raw: RawAsset): Asset => {
    // add missing asset code
    raw.code = makeCode(raw.name);

    // correct decimal precisions of prices
    raw.buying = parsePrice(raw.buyingstr);
    raw.selling = parsePrice(raw.sellingstr);

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

const makeCode = (name: string): string => {
    // make code from first & last letter of the first word
    // and first letter of the second word in uppercase
    const [first, second] = name.split(' ');
    return `${first[0]}${first.at(-1)}${second[0]}`.toUpperCase();
};

import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // get query with default values
    const query = { limit: 10, ...getQuery(event) };

    // fetch assets from collect api
    let rawAssets = await fetchCollectApi<RawAsset[]>('/allCurrency');

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
    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

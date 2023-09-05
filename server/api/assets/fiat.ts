import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/allCurrency');

    // return processed assets
    return rawAssets.slice(0, 10).map(processRawAsset);
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

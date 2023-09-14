import { Asset, BaseCode } from '~/server/types';

interface Query {
    base?: BaseCode;
}

const assetMap: Record<string, Asset> = {};

export default defineEventHandler(async (event) => {
    // get query params
    const query = getQuery<Query>(event);
    const baseCode = query.base ?? 'TRY';

    // get parity of base currency to TRY
    const parity = await fetchRate(baseCode);

    // fetch assets from collect api
    const assets = await fetchAssets('gold');

    // return processed assets
    return assets.map((asset) => {
        // apply base parity
        asset.buying /= parity;
        asset.selling /= parity;

        // get previous asset
        const previous = assetMap[asset.code];

        // calculate delta based on previous (buffered) asset
        asset.delta = calculateDelta(asset.buying, previous?.buying);

        // update asset map
        assetMap[asset.code] = asset;

        return asset;
    });
});

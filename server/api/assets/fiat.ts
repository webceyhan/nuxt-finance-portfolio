import { Asset } from '~/server/types';

const assetMap: Record<string, Asset> = {};

export default defineEventHandler(async (event) => {
    // get query with default values
    const query = { limit: 10, ...getQuery(event) };

    // fetch assets from collect api
    let assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit if needed
    if (query.limit) {
        assets = assets.slice(0, query.limit);
    }

    // process assets
    return assets.map((asset) => {
        // get previous asset
        const previous = assetMap[asset.code];

        // normalize asset
        asset = normalizeAsset(asset, previous);

        // update asset map
        assetMap[asset.code] = asset;

        // return asset
        return asset;
    });
});

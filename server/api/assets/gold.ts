import { BaseCode } from '~/server/types';

interface Query {
    base?: BaseCode;
}

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

        return asset;
    });
});

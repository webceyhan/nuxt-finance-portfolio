import { Asset } from '~/server/types';
import { fetchCollectApi, normalizeAssets } from '~/server/utils/collect-api';

export default defineEventHandler(async (event) => {
    // get query with default values
    const query = { limit: 10, ...getQuery(event) };

    // fetch assets from collect api
    let assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit if needed
    if (query.limit) {
        assets = assets.slice(0, query.limit);
    }

    // normalize assets
    return assets.map(normalizeAssets);
});

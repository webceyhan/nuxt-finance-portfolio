import { Asset } from '../server/types';
import { fetchCollectApi, makeCode } from '../server/utils';

export const getCurrencyPrices = async () => {
    const assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit to 5 assets
    return assets.slice(0, 5);
};

export const getGoldPrices = async () => {
    const assets = await fetchCollectApi<Asset[]>('/goldPrice');

    return (
        assets
            // limit to 5 assets
            .slice(0, 5)
            // add code to assets
            .map((asset) => ({
                ...asset,
                code: makeCode(asset.name),
            }))
    );
};

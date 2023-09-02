import { Asset } from './types';
import { fetchCollectApi, makeCode } from './utils';

export const getFiatAssets = async () => {
    const assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit to 5 assets
    return assets.slice(0, 5);
};

export const getGoldAssets = async () => {
    const assets = await fetchCollectApi<Asset[]>('/goldPrice');

    // limit to 5 assets
    return assets.slice(0, 5).map((asset) => ({
        ...asset,
        code: makeCode(asset.name),
    }));
};

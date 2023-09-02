import { Asset } from '../types';
import { fetchCollectApi } from '../utils';

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

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

function makeCode(name: string) {
    // make code from first & last letter of the first word
    // and first letter of the second word in uppercase
    const [first, second] = name.split(' ');

    return `${first[0]}${first.at(-1)}${second[0]}`.toUpperCase();
}

import { Asset } from '../types';
import { fetchCollectApi } from '../utils';

export const getFiatAssets = async () => {
    const assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit to 5 assets
    return assets.slice(0, 5).map(normalize);
};

export const getGoldAssets = async () => {
    const assets = await fetchCollectApi<Asset[]>('/goldPrice');

    // limit to 5 assets
    return assets.slice(0, 5).map(normalize);
};

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

function normalize(raw: Asset): Asset {
    return <Asset>{
        name: raw.name,
        code: raw.code ?? makeCode(raw.name),
        buying: raw.buying,
        selling: raw.selling,
    };
}

function makeCode(name: string): string {
    // make code from first & last letter of the first word
    // and first letter of the second word in uppercase
    const [first, second] = name.split(' ');

    return `${first[0]}${first.at(-1)}${second[0]}`.toUpperCase();
}

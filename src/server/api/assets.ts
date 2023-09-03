import { Asset } from '../types';
import { fetchCollectApi } from '../utils';

interface Query {
    limit?: number;
}

const QUERY: Query = {
    limit: 10,
};

export const getFiatAssets = async (query = { ...QUERY }) => {
    // fetch assets from collect api
    let assets = await fetchCollectApi<Asset[]>('/allCurrency');

    // limit if needed
    if (query.limit) {
        assets = assets.slice(0, query.limit);
    }

    // normalize assets
    return assets.map(normalize);
};

export const getGoldAssets = async (query = { ...QUERY }) => {
    // fetch assets from collect api
    let assets = await fetchCollectApi<Asset[]>('/goldPrice');

    // limit if needed
    if (query.limit) {
        assets = assets.slice(0, query.limit);
    }

    // normalize assets
    return assets.map(normalize);
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

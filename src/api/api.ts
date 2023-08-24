import { makeCode } from '../utils';
import { Asset, Transaction } from './models';

const IS_DEV = import.meta.env.DEV;
const mocks = import.meta.glob('./mock/*.json');

// define api constants
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';
const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

// define api fecther
const fetchApi = async <T>(path: string): Promise<T> => {
    if (IS_DEV) return fetchMock<T>(path);

    const response = await fetch(`${API_URL}${path}`, { headers });
    return (await response.json()).result;
};

const fetchMock = async <T>(path: string): Promise<T> =>
    (await mocks[`./mock${path}.json`]()).default;

// export const getTransactions = async () => fetchMock<Transaction[]>('/transactions');

export const getCurrencyPrices = async () => {
    const assets = await fetchApi<Asset[]>('/allCurrency');

    // limit to 5 assets
    return assets.slice(0, 5);
};

export const getGoldPrices = async () => {
    const assets = await fetchApi<Asset[]>('/goldPrice');

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

import { Asset, Holding } from './models';

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

export const getHoldings = async () => fetchMock<Holding[]>('/portfolio');

export const getCurrencyPrices = async () => fetchApi<Asset[]>('/allCurrency');

export const getGoldPrices = async () => fetchApi<Asset[]>('/goldPrice');

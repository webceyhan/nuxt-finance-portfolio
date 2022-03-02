import { Asset, Holding } from './models';

const IS_DEV = import.meta.env.DEV;

// define api constants
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';
const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

// define api fecther
const fetchApi = async <T>(path: string): Promise<T> => {
    if (IS_DEV) {
        return (await import(`./mock/${path}.json`)).default;
    }

    const response = await fetch(`${API_URL}${path}`, { headers });
    return (await response.json()).result;
};

export const getHoldings = async () => fetchApi<Holding[]>('/portfolio');

export const getCurrencyPrices = async () => fetchApi<Asset[]>('/allCurrency');

export const getGoldPrices = async () => fetchApi<Asset[]>('/goldPrice');

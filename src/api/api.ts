import { Asset, Holding } from './models';

const IS_DEV = import.meta.env.DEV;

console.log(import.meta.env)

// define api constants
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';
const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

// define api fecther
const fetchApi = async (path: string) => {
    if (IS_DEV) {
        return (await import(`./mock/${path}.json`)).default;
    }

    const response = await fetch(`${API_URL}${path}`, { headers });
    return (await response.json()).result;
};


export const getHoldings = async (): Promise<Holding[]> =>
    fetchApi('/portfolio');

export const getCurrencyPrices = async (): Promise<Asset[]> =>
    fetchApi('/allCurrency');

export const getGoldPrices = async (): Promise<Asset[]> =>
    fetchApi('/goldPrice');

import { Asset, Holding } from './models';

// define api constants
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';
const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

// define api fecther
const fetchApi = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`, { headers });
    return response.json();
};

export const getHoldings = async (): Promise<Holding[]> => {
    return (await import('./mock/portfolio.json')).default;
    // const data = await fetchApi('/portfolio');
    // return data.result;
};

export const getCurrencyPrices = async (): Promise<Asset[]> => {
    return (await import('./mock/all-currency.json')).default;
    // const response = await fetchApi('/allCurrency');
    // return response.result;
};

export const getGoldPrices = async (): Promise<Asset[]> => {
    return (await import('./mock/gold-price.json')).default;
    // const data = await fetchApi('/goldPrice');
    // return data.result;
};

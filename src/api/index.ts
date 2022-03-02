import { Asset, Holding } from './models';

export * from './models';

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';

const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};



const fetchApi = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`, { headers });
    return response.json();
};

export const getCurrencies = async () => {
    return (await import('./mock/all-currency.json')).default as Asset[];
    // const response = await fetchApi('/allCurrency');
    // return response.result;
};

export const getGoldPrices = async () => {
    return (await import('./mock/gold-price.json')).default as Asset[];
    // const data = await fetchApi('/goldPrice');
    // return data.result;
};

export const getAssets = async() => [
    ...(await getCurrencies()),
    ...(await getGoldPrices()),
];

export const getHoldings = async () => {
    return (await import('./mock/portfolio.json')).default as Holding[];
    // const data = await fetchApi('/portfolio');
    // return data.result;
};

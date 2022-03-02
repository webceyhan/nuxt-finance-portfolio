const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';

const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

export interface Asset {
    name: string;
    buying: number;
    selling: number;
    datetime: string;
    rate: number;
}

export interface Holding {
    name: string;
    amount: number;
    buyPrice?: number;
    timestamp?: number;
}

const fetchApi = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`, { headers });
    return response.json();
};

export const getCurrencies = async () => {
    return (await import('./all-currency.json')).default as Asset[];
    // const response = await fetchApi('/allCurrency');
    // return response.result;
};

export const getGoldPrices = async () => {
    return (await import('./gold-price.json')).default as Asset[];
    // const data = await fetchApi('/goldPrice');
    // return data.result;
};

export const getAssets = async () => [
    ...(await getCurrencies()),
    ...(await getGoldPrices()),
];

export const getHoldings = async () => {
    return (await import('./portfolio.json')).default as Holding[];
    // const data = await fetchApi('/portfolio');
    // return data.result;
};

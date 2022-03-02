const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = 'https://api.collectapi.com/economy';

const headers = {
    'content-type': 'application/json',
    authorization: `apikey ${API_KEY}`,
};

export interface GoldResponse {
    name: string;
    buying: number;
    selling: number;
    datetime: string;
    rate: number;
}

const fetchApi = async (path: string) => {
    const response = await fetch(`${API_URL}${path}`, { headers });
    return response.json();
};

export const getGoldPrices = async () => {
    return (await import('./goldPrice.json')).default as GoldResponse[];
    // const data = await fetchApi('/goldPrice');
    // return data.result;
};

import { COLLECT_API_KEY, COLLECT_API_URL, IS_DEV } from '../constants';
import { Asset } from '../types';

export async function fetchCollectApi<T>(path: string): Promise<T> {
    // fetch mock data if in development
    if (IS_DEV) {
        const data = (await fetchMock<T>(path)) as any[];

        // add fake volatility for asset prices
        return data.map(addVolatility) as T;
    }

    const response = await fetch(`${COLLECT_API_URL}${path}`, {
        headers: { authorization: `apikey ${COLLECT_API_KEY}` },
    });

    return (await response.json()).result;
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

export function normalizeAsset(raw: Asset, previous?: Asset): Asset {
    return <Asset>{
        name: raw.name,
        code: raw.code,
        buying: raw.buying,
        selling: raw.selling,
        delta: calculateDelta(raw, previous),
    };
}

function addVolatility(asset: Asset) {
    // parse prices from string version
    const buy = parsePrice((asset as any).buyingstr);
    const sell = parsePrice((asset as any).sellingstr);

    // calculate the difference with 5% of delta
    const diff = buy * makeDelta(5);

    return {
        ...asset,
        buying: buy + diff,
        selling: sell + diff,
        // these are still needed for gold
        buyingstr: `${buy + diff}`.replace('.', ','),
        sellingstr: `${sell + diff}`.replace('.', ','),
    };
}

const makeDelta = (max = 5) => {
    // get max volatility in percent
    const percent = Math.floor(Math.random() * max) / 100;

    // get random sign (up or down)
    const sign = Math.random() > 0.5 ? 1 : -1;

    return sign * percent;
};

const calculateDelta = (asset: Asset, previous?: Asset) => {
    if (!previous) return 0;

    // calculate the difference
    const diff = asset.buying - previous.buying;

    // calculate the percentage
    return (diff / previous.buying) * 100;
};

const parsePrice = (value: string) => {
    // this is a correction for the CollectAPI decimals
    // being formatted as 1.500,0123 instead of 1,500.0123

    // return as number if no , is present
    if (!value.includes(',')) return +value;
    // else swap , and . and return as number
    return +value.replace('.', '').replace(',', '.');
};

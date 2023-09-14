import { Asset, BaseCode, RawAsset } from '../types';
import {
    ASSET_I18N_MAP,
    ASSET_RATE_MAP,
    COLLECT_API_KEY,
    COLLECT_API_URL,
    IS_DEV,
} from '../constants';

type AssetType = 'fiat' | 'gold';

const typePathMap: Record<AssetType, string> = {
    fiat: '/allCurrency',
    gold: '/goldPrice',
};

async function fetchApi<T>(path: string): Promise<T> {
    if (IS_DEV) {
        // fetch mock data if in development
        return await fetchMock<T>(path);
    }

    // fetch from CollectAPI if in production
    const response = await fetch(`${COLLECT_API_URL}${path}`, {
        headers: { authorization: `apikey ${COLLECT_API_KEY}` },
    });

    // get the result from the response
    return (await response.json()).result;
}

export async function fetchAssets(type: AssetType) {
    const path = typePathMap[type];
    const rawAssets = await fetchApi<RawAsset[]>(path);

    return rawAssets.reduce((acc, raw) => {
        // filter out if not valid
        if (!isValid(raw)) return acc;

        // normalize and add to the accumulator
        return [...acc, normalizeAsset(raw)];
    }, [] as Asset[]);
}

export async function fetchRate(code: BaseCode = 'TRY'): Promise<number> {
    // skip if code is TRY
    if (code === 'TRY') return 1;

    // define response type
    let response: { result: [RawAsset] };

    if (IS_DEV) {
        response = fetchMock<any>(`/singleCurrency-${code}`);
    } else {
        response = await $fetch<any>(`${COLLECT_API_URL}/singleCurrency`, {
            headers: { authorization: `apikey ${COLLECT_API_KEY}` },
            query: { tag: code },
            ignoreResponseError: true,
        });
    }

    return response.result[0].buying;
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const isValid = (asset: RawAsset): boolean => {
    return ASSET_I18N_MAP[asset.name] != undefined;
};

const normalizeAsset = (raw: RawAsset): Asset => {
    // make name and code corrections
    const name = translateName(raw.name);
    const code = raw.code ?? makeCode(name);

    // get the rate from the map
    const rate = ASSET_RATE_MAP[name];

    // make delta for development
    const delta = IS_DEV ? makeDelta() : 0;

    // parse prices for decimal correction
    const buying = addVolatility(parsePrice(raw.buyingstr), delta);
    const selling = addVolatility(parsePrice(raw.sellingstr), delta);

    return <Asset>{ name, code, buying, selling, delta, rate };
};

const translateName = (name: string): string => {
    return ASSET_I18N_MAP[name] ?? name;
};

const makeCode = (name: string): string => {
    // take first and last words of the name
    const first = name.split(' ')[0];
    const last = name.split(' ').at(-1);

    // use first and last letters of the first word
    // and first letter of the last word or second word's first letter
    return `${first[0]}${first.at(-1)}${last?.[0]}`.toUpperCase();
};

const parsePrice = (price: string): number => {
    return +price.replace('.', '').replace(',', '.');
};

const makeDelta = (max = 5): number => {
    // get random sign (up or down)
    const sign = Math.random() > 0.5 ? 1 : -1;

    // get max volatility in percent
    const percent = Math.ceil(Math.random() * max) / 100;

    return sign * percent;
};

const addVolatility = (price: number, delta: number): number => {
    return price + price * delta;
};

export const calculateDelta = (price: number, previous = 0): number => {
    return previous ? ((price - previous) / previous) * 100 : 0;
};

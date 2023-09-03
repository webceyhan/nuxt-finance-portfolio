import { COLLECT_API_KEY, COLLECT_API_URL, IS_DEV } from '../constants';
import { Asset } from '../types';

export async function fetchCollectApi<T>(path: string): Promise<T> {
    // fetch mock data if in development
    if (IS_DEV) return await fetchMock<T>(path);

    const response = await fetch(`${COLLECT_API_URL}${path}`, {
        headers: { authorization: `apikey ${COLLECT_API_KEY}` },
    });

    return (await response.json()).result;
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

export function normalizeAsset(raw: Asset): Asset {
    return <Asset>{
        name: raw.name,
        code: raw.code,
        buying: raw.buying,
        selling: raw.selling,
    };
}

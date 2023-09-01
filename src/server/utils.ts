import {
    IS_DEV,
    MOCKS_DIR,
    COLLECT_API_KEY,
    COLLECT_API_URL,
} from './constants';

export async function fetchMock<T>(path: string): Promise<T> {
    return (await fetch(`${MOCKS_DIR}${path}.json`)).json();
}

export async function fetchCollectApi<T>(path: string): Promise<T> {
    // fetch mock data if in development
    if (IS_DEV) return await fetchMock<T>(path);

    const response = await fetch(`${COLLECT_API_URL}${path}`, {
        headers: { authorization: `apikey ${COLLECT_API_KEY}` },
    });

    return (await response.json()).result;
}

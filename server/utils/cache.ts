interface CachedItem<T> {
    expires: number;
    value: T;
}

// define cache storage
const cache = useStorage('cache');

const isExpired = (item: CachedItem<any>): boolean => {
    // check if item is expired
    return item.expires < Date.now();
};

export const getCache = async <T>(key: string): Promise<T | null> => {
    // get cache or return null if not available or expired
    const item = await cache.getItem<CachedItem<T>>(key);
    return item && !isExpired(item) ? item.value : null;
};

export const setCache = (key: string, value: any, ttl = 86400): void => {
    // set cache with default ttl for a day
    const expires = Date.now() + ttl * 1000;
    cache.setItem(key, { expires, value });
};

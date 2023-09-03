import { ref, watch } from 'vue';
import { Asset, AssetCategory } from '../server/types';

export function useAssets() {
    // states
    const assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');
    const fetcher = useFetch<Asset[]>(() => `/api/assets/${category.value}}`);

    // populate assets
    fetcher.then(({ data }) => (assets.value = data.value as any));

    // actions
    const load = () => fetcher.refresh();

    // load assets when category changes
    watch(category, async () => load());

    return {
        category,
        assets,
        load,
    };
}

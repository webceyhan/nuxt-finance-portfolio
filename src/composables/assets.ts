import { onMounted, ref, watch } from 'vue';
import { Asset, AssetCategory } from '../server/types';
import { getFiatAssets, getGoldAssets } from '../server/api';

export function useAssets() {
    // states
    const assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');

    // actions
    const load = async () => {
        const fetch = {
            fiat: getFiatAssets,
            gold: getGoldAssets,
        };

        assets.value = await fetch[category.value]();
    };

    // load assets when category changes
    watch(category, async () => load());

    // load assets on mount
    onMounted(async () => load());

    return {
        category,
        assets,
        load,
    };
}

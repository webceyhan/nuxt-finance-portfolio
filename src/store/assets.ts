import { onMounted, ref, watch } from 'vue';
import { Asset } from '../server/types';
import { getFiatAssets, getGoldAssets } from '../server/api';

type Category = 'fiat' | 'gold';

const category = ref<Category>('fiat');
const assets = ref<Asset[]>([]);

const load = async () => {
    const fetch = {
        fiat: getFiatAssets,
        gold: getGoldAssets,
    };

    assets.value = await fetch[category.value]();
};

export const useAssets = () => {
    // load assets when category changes
    watch(category, async () => load());

    // load assets on mount
    onMounted(async () => load());

    return {
        category,
        assets,
        load,
    };
};

import { computed, ref } from 'vue';
import { Asset } from '../server/types';
import { getFiatAssets, getGoldAssets } from '../server/api';

type Category = 'fiat' | 'gold';

const category = ref<Category>('fiat');
const assets = ref<Asset[]>([]);

const assetMap = computed<Record<string, Asset>>(() =>
    assets.value.reduce((acc, cur) => ({ ...acc, [cur.code]: cur }), {} as any)
);

const load = async () => {
    const fetch = {
        fiat: getFiatAssets,
        gold: getGoldAssets,
    };

    assets.value = await fetch[category.value]();
};

export const useAssets = () => ({
    category,
    assets,
    assetMap,
    load,
});

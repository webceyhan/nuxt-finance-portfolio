import { computed, ref } from 'vue';
import { Asset, getFiatAssets, getGoldAssets } from '../api';

const fiatAssets = ref<Asset[]>([]);
const goldAssets = ref<Asset[]>([]);

const assets = computed<Asset[]>(() => [
    ...fiatAssets.value,
    ...goldAssets.value,
]);

const assetMap = computed<Record<string, Asset>>(() =>
    assets.value.reduce((acc, cur) => ({ ...acc, [cur.code]: cur }), {} as any)
);

const load = async () => {
    fiatAssets.value = await getFiatAssets();
    goldAssets.value = await getGoldAssets();
};

export const useAssets = () => ({
    assets,
    assetMap,
    fiatAssets,
    goldAssets,
    load,
});

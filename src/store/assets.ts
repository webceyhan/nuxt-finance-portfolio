import { computed, reactive } from 'vue';
import { getCurrencyPrices, getGoldPrices, Asset } from '../api';

const state = reactive({
    golds: [] as Asset[],
    currencies: [] as Asset[],
});

const assets = computed<Asset[]>(() => [...state.currencies, ...state.golds]);

const assetMap = computed<{ [name: string]: Asset }>(() =>
    assets.value.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {} as any)
);

const load = async () => {
    state.golds = await getGoldPrices();
    state.currencies = await getCurrencyPrices();
};

export const useAssets = () => ({
    assets,
    assetMap,
    load,
});

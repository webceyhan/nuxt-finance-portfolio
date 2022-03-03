import { computed, reactive } from 'vue';
import {
    getCurrencyPrices,
    getGoldPrices,
    getHoldings,
    Asset,
    Holding,
} from './api';

const state = reactive({
    assets: [] as Asset[],
    holdings: [] as Holding[],
});

const assetMap = computed<{ [key: string]: Asset }>(() =>
    state.assets.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {})
);

const portfolio = computed<(Holding & Asset)[]>(() =>
    state.holdings.map((holding) => ({
        ...holding,
        ...assetMap.value[holding.name],
    }))
);

const total = computed(() =>
    portfolio.value.reduce((acc, cur) => acc + cur.buying * cur.amount, 0)
);

const cost = computed(() =>
    portfolio.value.reduce((acc, cur) => acc + cur.price * cur.amount, 0)
);

const profit = computed(() => total.value - cost.value);

const load = async () => {
    state.holdings = await getHoldings();
    state.assets = [...(await getCurrencyPrices()), ...(await getGoldPrices())];
};

export const useStore = () => ({
    assets: computed(() => state.assets),
    portfolio,
    total,
    cost,
    profit,
    load,
});

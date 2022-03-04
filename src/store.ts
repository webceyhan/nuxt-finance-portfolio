import { computed, reactive } from 'vue';
import {
    getTransactions,
    getCurrencyPrices,
    getGoldPrices,
    Asset,
    Holding,
    Transaction,
    Portfolio,
} from './api';

const state = reactive({
    assets: [] as Asset[],
    transactions: [] as Transaction[],
});

const assetMap = computed<{ [key: string]: Asset }>(() =>
    state.assets.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {})
);

const txsMap = computed<{ [key: string]: Transaction }>(() =>
    state.transactions.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: [...([cur.id] || []), cur] }),
        {}
    )
);

const holdings = computed<Holding[]>(() =>
    Object.entries(txsMap.value).map(
        ([name, txs]) =>
            new Holding(name, assetMap.value[name].buying, txs as any)
    )
);

const portfolio = computed<Portfolio>(() => new Portfolio(holdings.value));

const load = async () => {
    state.transactions = await getTransactions();
    state.assets = [...(await getCurrencyPrices()), ...(await getGoldPrices())];
};

export const useStore = () => ({
    assets: computed(() => state.assets),
    portfolio,
    load,
});

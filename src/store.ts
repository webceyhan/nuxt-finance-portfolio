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

const assetMap = computed<{ [name: string]: Asset }>(() =>
    state.assets.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {})
);

const txsMap = computed<{ [id: string]: Transaction }>(() =>
    state.transactions.reduce(
        (acc, tx) => ({ ...acc, [tx.id]: [...(acc[tx.id] || []), tx] }),
        {} as any
    )
);

const holdings = computed<Holding[]>(() =>
    Object.entries(txsMap.value).map(
        ([id, txs]) => new Holding(id, assetMap.value[id]?.buying, txs as any)
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

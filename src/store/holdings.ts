import { computed, reactive } from 'vue';
import { useAssets } from './assets';
import { getTransactions, Holding, Transaction, Portfolio } from '../api';

const { load: loadAssets, assetMap } = useAssets();

const state = reactive({
    transactions: [] as Transaction[],
});

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
    loadAssets();
    state.transactions = await getTransactions();
};

export const useHoldings = () => ({
    transactions: state.transactions,
    holdings,
    portfolio,
    load,
});

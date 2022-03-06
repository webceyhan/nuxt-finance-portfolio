import { computed, reactive } from 'vue';
import { useAssets } from './assets';
import { getTransactions, Holding, Transaction, Portfolio } from '../api';

const { load: loadAssets, assetMap } = useAssets();

const state = reactive({
    transactions: [] as Transaction[],
    holding: undefined as Holding | undefined,
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
    await loadAssets();
    state.transactions = await getTransactions();
};

const selectHolding = async (id: string) => {
    await load();
    state.holding = holdings.value.find((h) => h.name === id);
};

const editTx = async (tx: Transaction) => {
    const index = state.transactions.findIndex((t) => t.id === tx.id);
    if (index >= 0) state.transactions[index] = tx;
};

const removeTx = async (id: string) => {
    const index = state.transactions.findIndex((t) => t.id === id);
    state.transactions.splice(index, 1);
};

export const useHoldings = () => ({
    transactions: computed(() => state.transactions),
    holding: computed(() =>
        // bugfix: reactive() method converts class instance to proxy object
        // when assigning to state.holding, and this causes getters not to work
        !state.holding
            ? null
            : new Holding(
                  state.holding.name,
                  state.holding.price,
                  state.holding.transactions
              )
    ),
    holdings,
    portfolio,
    load,
    selectHolding,
    editTx,
    removeTx,
});

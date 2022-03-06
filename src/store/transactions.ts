import { computed, reactive } from 'vue';
import { getTransactions, Transaction, KeyMap } from '../api';

const state = reactive({
    all: [] as Transaction[],
});

const transactionMap = computed<KeyMap<Transaction[]>>(() =>
    state.all.reduce(
        (acc, tx) => ({ ...acc, [tx.id]: [...(acc[tx.id] || []), tx] }),
        {} as any
    )
);

async function load() {
    state.all = await getTransactions();
}

function get(id: string): Transaction | undefined {
    return state.all.find((tx) => tx.id === id);
}

function set(tx: Transaction) {
    const index = state.all.findIndex((t) => t.id === tx.id);

    if (index < 0) state.all.push(tx);
    else state.all[index] = tx;
}

function remove(id: string) {
    const index = state.all.findIndex((t) => t.id === id);
    state.all.splice(index, 1);
}

export const useTransactions = () => ({
    transactions: computed(() => state.all),
    transactionMap,
    load,
    get,
    set,
    remove,
});

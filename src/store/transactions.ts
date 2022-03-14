import { computed, reactive } from 'vue';
import {
    onTransactions,
    getTransaction,
    setTransaction,
    removeTransaction,
    Transaction,
    KeyMap,
} from '../api';

const state = reactive({
    all: [] as Transaction[],
});

const transactionMap = computed<KeyMap<Transaction[]>>(() =>
    state.all.reduce(
        (acc, tx) => ({ ...acc, [tx.name]: [...(acc[tx.name] || []), tx] }),
        {} as any
    )
);

async function load() {
    // state.all = await getTransactions();
    onTransactions((txs) => (state.all = txs));
}

// function get(id: number): Transaction | undefined {
//     return state.all.find((tx) => tx.id === id);
// }

// function set(tx: Transaction) {
//     const index = state.all.findIndex((t) => t.id === tx.id);

//     if (index < 0) state.all.push(tx);
//     else state.all.splice(index, 1, tx);
// }

// function remove(id: number) {
//     const index = state.all.findIndex((t) => t.id === id);
//     state.all.splice(index, 1);
// }

export const useTransactions = () => ({
    transactions: computed(() => state.all),
    transactionMap,
    load,
    getTransaction,
    setTransaction,
    removeTransaction,
});

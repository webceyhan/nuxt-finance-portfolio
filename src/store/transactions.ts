import { computed, ref } from 'vue';
import {
    onTransactions,
    getTransaction,
    setTransaction,
    removeTransaction,
    Transaction,
    KeyMap,
} from '../api';

const transactions = ref<Transaction[]>([]);

const transactionMap = computed<KeyMap<Transaction[]>>(() =>
    transactions.value.reduce(
        (acc, tx) => ({ ...acc, [tx.code]: [...(acc[tx.code] || []), tx] }),
        {} as any
    )
);

async function load() {
    // state.all = await getTransactions();
}
onTransactions((txs) => (transactions.value = txs));

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
    transactions,
    transactionMap,
    load,
    getTransaction,
    setTransaction,
    removeTransaction,
});

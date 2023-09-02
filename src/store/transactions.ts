import { computed, ref } from 'vue';
import { Transaction } from '../server/types';
import {
    onTransactions,
    getTransaction,
    setTransaction,
    removeTransaction,
} from '../server/api';

const transactions = ref<Transaction[]>([]);

const transactionMap = computed<Record<string, Transaction[]>>(() =>
    transactions.value.reduce(
        (acc, tx) => ({ ...acc, [tx.code]: [...(acc[tx.code] || []), tx] }),
        {} as any
    )
);

async function load() {
    // state.all = await getTransactions();
}

onTransactions((txs: any) => (transactions.value = txs));

export const useTransactions = () => ({
    transactions,
    transactionMap,
    load,
    getTransaction,
    setTransaction,
    removeTransaction,
});

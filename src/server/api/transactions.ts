import { Transaction } from '../types';
import { useCollection } from '../../composables/firestore';

// Get a reference to the transactions collection
export const {
    findAll: getTransactions,
    findOne: getTransaction,
    saveOne: setTransaction,
    removeOne: removeTransaction,
    watch: onTransactions,
} = useCollection<Transaction>('transactions');

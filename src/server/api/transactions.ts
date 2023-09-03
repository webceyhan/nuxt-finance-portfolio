import { Transaction } from '../types';
import { useFirestore } from '../../composables/firestore';

const PATH = 'transactions';

const { findAll, findOne, removeOne, saveOne, watch } = useFirestore();

export async function getTransactions(code?: string) {
    return await findAll<Transaction>(PATH, {
        key: 'code',
        value: code,
    });
}

export async function getTransaction(id: string) {
    return await findOne<Transaction>(PATH, id);
}

export async function setTransaction(tx: Transaction) {
    return await saveOne(PATH, tx);
}

export async function removeTransaction(id: string) {
    return await removeOne(PATH, id);
}

// @todo: remove this later from the server side
export const onTransactions = (listener: any) =>
    watch<Transaction>(PATH, listener);

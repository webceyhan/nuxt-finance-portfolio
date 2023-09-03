import { Transaction } from 'server/types';

const { findAll, findOne, removeOne, saveOne, watch } = useFirestore();

export function useTransactions() {
    const PATH = 'transactions';

    return {
        getTransactions: (code?: string) =>
            findAll<Transaction>(PATH, {
                key: 'code',
                value: code,
            }),
        getTransaction: (id: string) => findOne<Transaction>(PATH, id),
        setTransaction: (tx: Transaction) => saveOne(PATH, tx),
        removeTransaction: (id: string) => removeOne(PATH, id),
        onTransactions: (listener: any) => watch<Transaction>(PATH, listener),
    };
}

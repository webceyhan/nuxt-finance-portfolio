const PATH = "transactions";

export function useTransactions() {
  // state
  const transactions = ref<Transaction[]>([]);
  const { findAll, findOne, removeOne, saveOne, onChange } = useFirestore();

  // actions
  const load = async () => {
    transactions.value = await findAll<Transaction>(PATH);
  };

  // listen to tranasction changes
  const unsubsrcibe = onChange<Transaction>(
    PATH,
    (txs) => (transactions.value = txs)
  );

  // unsubsrcibe listening
  onUnmounted(() => unsubsrcibe());

  return {
    load,
    transactions,
    getTransactions: (code?: string) => findAll<Transaction>(PATH),
    getTransaction: (id: string) => findOne<Transaction>(PATH, id),
    setTransaction: (tx: Transaction) => saveOne(PATH, tx),
    removeTransaction: (id: string) => removeOne(PATH, id),
  };
}

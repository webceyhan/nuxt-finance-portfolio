export function usePortfolio() {
    // state
    const balance = ref(0);
    const cost = ref(0);
    const profit = ref(0);
    const profitPercent = ref(0);
    const { holdings, load: loadHoldings } = useHoldings();

    // actions
    const load = async () => {
        // reload holdings
        await loadHoldings();

        // process
        holdings.value.forEach((holding) => {
            cost.value += holding.cost;
            balance.value += holding.amount * holding.price;
        });
        
        profit.value = balance.value - cost.value;
        profitPercent.value = (profit.value / cost.value) * 100;
    };

    // load assets on mount
    onMounted(async () => load());

    // expose
    return {
        balance,
        cost,
        profit,
        profitPercent,
        holdings,
        load,
    };
}

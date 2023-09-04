import { Asset, Holding } from 'server/types';

export function useHoldings() {
    // state
    const assetMap = ref<Record<string, Asset>>({});
    const holdingMap = ref<Record<string, Holding>>({});
    const { transactions } = useTransactions();

    const holdings = computed<Holding[]>(() => {
        // reset holding map
        holdingMap.value = {};

        // populate holding map
        transactions.value.forEach(({ code, ...tx }) => {
            // get holding or create new one
            const holding = holdingMap.value[code] ?? {
                code,
                name: assetMap.value[code]?.name ?? 0,
                price: assetMap.value[code]?.buying ?? 0,
                amount: 0,
                cost: 0,
                transactions: [],
            };

            // recalculate holding amount & cost
            const isBuy = tx.type === 'buy';
            holding.amount += isBuy ? tx.amount : -tx.amount;
            holding.cost += (isBuy ? tx.price : -tx.price) * tx.amount;

            // add transaction
            holding.transactions.push({ code, ...tx });

            holdingMap.value[code] = holding;
        });

        return Object.values(holdingMap.value);
    });

    const cost = computed(() =>
        holdings.value.reduce((acc, { cost }) => acc + cost, 0)
    );

    const balance = computed(() =>
        holdings.value.reduce(
            (acc, { amount, price }) => acc + amount * price,
            0
        )
    );

    const profit = computed(() => balance.value - cost.value);
    const delta = computed(() => (profit.value / cost.value) * 100);

    // actions
    const load = async () => {
        // fetch current asset prices
        assetMap.value = await getAssetMap();
    };

    // initial load
    onMounted(load);

    return {
        holdings,
        balance,
        cost,
        profit,
        delta,
        load,
    };
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const getAssetMap = async () => {
    // fetch all assets
    const assets = [
        ...(await $fetch('/api/assets/fiat')),
        ...(await $fetch('/api/assets/gold')),
    ];

    // make map (code -> Asset)
    return assets.reduce(
        (acc, asset) => ({ ...acc, [asset.code]: asset }),
        {} as Record<string, Asset>
    );
};

import { Asset, Holding } from 'server/types';

type AssetMap = Record<string, Asset>;
type HoldingMap = Record<string, Holding>;

export function useHoldings() {
    // state
    const selectedCode = ref('');
    const assetMap = useState<AssetMap>('asset_map', () => ({}));
    const { transactions, load: loadTransactions } = useTransactions();

    const holdingMap = computed<HoldingMap>(() => {
        // populate holding map
        return transactions.value.reduce((acc, { code, ...tx }) => {
            // get holding or create new one
            const holding = acc[code] ?? {
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

            // return updated holding map
            return { ...acc, [code]: holding };
        }, {} as HoldingMap);
    });

    const holdings = computed<Holding[]>(() => {
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

    const selectedHolding = computed<Holding | null>(
        () => holdingMap.value[selectedCode.value] ?? null
    );

    // actions
    const load = async () => {
        // fetch current asset prices
        assetMap.value = await getAssetMap();
        loadTransactions();
    };

    // pre-load holdings
    onMounted(() => load());

    // reload on currency change
    watch(useCurrency(), () => load());

    return {
        holdings,
        balance,
        cost,
        profit,
        delta,
        selectedCode,
        selectedHolding,
        load,
    };
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const getAssetMap = async () => {
    const query = {
        base: useCurrency().value,
        retainBase: true,
    };

    // fetch all assets
    const assets = [
        ...(await $fetch('/api/assets/fiat', { query })),
        ...(await $fetch('/api/assets/gold', { query })),
    ];

    // make map (code -> Asset)
    return assets.reduce(
        (acc, asset) => ({ ...acc, [asset.code]: asset }),
        {} as Record<string, Asset>
    );
};

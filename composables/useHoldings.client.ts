import { Asset, Holding } from 'server/types';

type AssetMap = Record<string, Asset>;
type HoldingMap = Record<string, Holding>;

const { getTransactions } = useTransactions();

export function useHoldings() {
    // state
    const holdings = ref<Holding[]>([]);

    // actions
    const load = async () => {
        // fetch all transactions
        const transactions = await getTransactions();

        // fetch current asset prices
        const assetMap = await getAssetMap();

        // make map (code -> holding)
        const holdingMap: HoldingMap = {};

        // populate holding map
        transactions.forEach(({ code, ...tx }) => {
            // get holding or create new one
            const holding = holdingMap[code] ?? {
                code,
                name: assetMap[code].name,
                price: assetMap[code].buying,
                amount: 0,
                cost: 0,
                transactions: [],
            };

            // calculate amount & cost
            const isBuy = tx.type === 'buy';
            holding.amount += isBuy ? tx.amount : -tx.amount;
            holding.cost += (isBuy ? tx.price : -tx.price) * tx.amount;

            // add transaction
            holding.transactions.push({ code, ...tx });

            holdingMap[code] = holding;
        });

        holdings.value = Object.values(holdingMap);
    };

    return {
        holdings,
        load,
    };
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const getAssetMap = async (): Promise<AssetMap> => {
    // fetch all assets
    const assets = [
        ...(await $fetch('/api/assets/fiat')),
        ...(await $fetch('/api/assets/gold')),
    ];

    // make map (code -> Asset)
    return assets.reduce(
        (acc, asset) => ({ ...acc, [asset.code]: asset }),
        {} as AssetMap
    );
};

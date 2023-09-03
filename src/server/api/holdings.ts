import { Asset, Holding } from '../types';
import { getFiatAssets, getGoldAssets } from './assets';
import { getTransactions } from './transactions';

export async function getHolding(code: string) {
    // fetch all transactions with the given code
    const transactions = await getTransactions(code);

    // fetch current asset prices
    const assetMap = await getAssetMap();

    const holding = <Holding>{
        code,
        name: assetMap[code].name,
        price: assetMap[code].buying,
        amount: 0,
        cost: 0,
        transactions: [],
    };

    // calculate amount & cost
    transactions.forEach(({ type, amount, price }) => {
        const isBuy = type === 'buy';
        holding.amount += isBuy ? amount : -amount;
        holding.cost += (isBuy ? price : -price) * amount;
    });

    // add transactions
    holding.transactions = transactions;

    return holding;
}

export async function getHoldings() {
    // fetch all transactions
    const transactions = await getTransactions();

    // fetch current asset prices
    const assetMap = await getAssetMap();

    // make map (code -> holding)
    const holdingMap: Record<string, Holding> = {};

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

    return Object.values(holdingMap).flat();
}

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const getAssetMap = async () => {
    // fetch all assets from collect api
    const fiatAssets = await getFiatAssets();
    const goldAssets = await getGoldAssets();

    // make map (code -> Asset)
    return [...fiatAssets, ...goldAssets].reduce(
        (acc, asset) => ({
            ...acc,
            [asset.code]: asset,
        }),
        {} as Record<string, Asset>
    );
};

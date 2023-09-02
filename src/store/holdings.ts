import { computed, ref } from 'vue';
import { Holding } from '../server/types';
import { useAssets } from './assets';
import { useTransactions } from './transactions';

const { load: loadAssets, assetMap } = useAssets();
const { load: loadTransactions, transactionMap } = useTransactions();

const selectedCode = ref<string | null>(null);

const holdings = computed<Holding[]>(() => {
    return Object.entries(transactionMap.value).map(([code, txs]) => {
        const price = assetMap.value[code]?.buying;
        let amount = 0;
        let cost = 0;

        txs.forEach((tx) => {
            const isBuy = tx.type === 'buy';
            amount += isBuy ? tx.amount : -tx.amount;
            cost += isBuy ? tx.price * tx.amount : 0;
        });

        return <Holding>{
            code,
            name: assetMap.value[code]?.name,
            amount,
            cost,
            price,
        };
    });
});

const holding = computed(() =>
    holdings.value.find((h) => h.code === selectedCode.value)
);

const cost = computed<number>(() =>
    holdings.value.reduce((acc, { cost }) => acc + cost, 0)
);

const balance = computed<number>(() =>
    holdings.value.reduce((acc, { amount, price }) => acc + amount * price, 0)
);

const profit = computed<number>(() => balance.value - cost.value);

const profitPercent = computed<string>(() =>
    ((profit.value / cost.value) * 100).toFixed(2).concat('%')
);

async function load() {
    await loadAssets();
    await loadTransactions();
}

async function selectHolding(code: string) {
    await load();
    selectedCode.value = code;
}

export const useHoldings = () => ({
    holdings,
    holding,
    holdingTxs: computed(() =>
        selectedCode.value ? transactionMap.value[selectedCode.value] : []
    ),
    cost,
    balance,
    profit,
    profitPercent,
    load,
    selectHolding,
});

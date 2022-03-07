import { computed, reactive } from 'vue';
import { useAssets } from './assets';
import { Holding } from '../api';
import { useTransactions } from './transactions';

const { load: loadAssets, assetMap } = useAssets();
const { load: loadTransactions, transactionMap } = useTransactions();

const state = reactive({
    name: null as string | null,
});

const holdings = computed<Holding[]>(() => {
    return Object.entries(transactionMap.value).map(([name, txs]) => {
        const price = assetMap.value[name].buying;
        let amount = 0;
        let cost = 0;

        txs.forEach((tx) => {
            const isBuy = tx.type === 'buy';
            amount += isBuy ? tx.amount : -tx.amount;
            cost += isBuy ? tx.price * tx.amount : 0;
        });

        return <Holding>{ name, amount, cost, price };
    });
});

const holding = computed(() =>
    holdings.value.find((h) => h.name === state.name)
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

async function selectHolding(name: string) {
    await load();
    state.name = name;
}

export const useHoldings = () => ({
    holdings,
    holding,
    holdingTxs: computed(() =>
        state.name ? transactionMap.value[state.name] : []
    ),
    cost,
    balance,
    profit,
    profitPercent,
    load,
    selectHolding,
});

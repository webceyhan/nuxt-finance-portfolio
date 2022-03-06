import { computed, reactive } from 'vue';
import { useAssets } from './assets';
import { Holding } from '../api';
import { useTransactions } from './transactions';

const { load: loadAssets, assetMap } = useAssets();
const { load: loadTransactions, transactionMap } = useTransactions();

const state = reactive({
    one: undefined as Holding | undefined,
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

async function selectHolding(id: string) {
    await load();
    state.one = holdings.value.find((h) => h.name === id);
}

export const useHoldings = () => ({
    holdings,
    holding: computed(() => state.one),
    holdingTxs: computed(() =>
        state.one ? transactionMap.value[state.one.name] : []
    ),
    cost,
    balance,
    profit,
    profitPercent,
    load,
    selectHolding,
});

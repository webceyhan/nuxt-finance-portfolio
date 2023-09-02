import { computed, ref } from 'vue';
import { Holding } from '../server/types';
import { useTransactions } from './transactions';
import { getHoldings } from '../server/api';

const { load: loadTransactions, transactionMap } = useTransactions();

const selectedCode = ref<string | null>(null);

const holdings = ref<Holding[]>([]);

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
    await loadTransactions();
    holdings.value = await getHoldings();
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

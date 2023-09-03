import { computed, ref } from 'vue';
import { Holding } from '../server/types';
import { getHoldings } from '../server/api';

const selectedCode = ref<string | null>(null);

const holdings = ref<Holding[]>([]);

const holding = computed(() =>
    holdings.value.find((h) => h.code === selectedCode.value)
);

async function load() {
    holdings.value = await getHoldings();
}

async function selectHolding(code: string) {
    await load();
    selectedCode.value = code;
}

export const useHoldings = () => ({
    holdings,
    holding,
    load,
    selectHolding,
});

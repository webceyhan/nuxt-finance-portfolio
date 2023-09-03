import { computed, onMounted, ref } from 'vue';
import { Holding } from '../server/types';
import { getHoldings, getHolding } from '../server/api';
import { setTransaction, removeTransaction } from '../server/api';

export function useHoldings() {
    // state
    const holdings = ref<Holding[]>([]);
    const selectedCode = ref<string | null>(null);

    // getters
    const holding = computed(() =>
        holdings.value.find((h) => h.code === selectedCode.value)
    );

    // actions
    async function load() {
        holdings.value = await getHoldings();
    }

    async function refresh() {
        if (selectedCode.value) {
            holdings.value = [await getHolding(selectedCode.value)];
        }
    }

    // load on mount
    onMounted(load);

    return {
        selectedCode,
        holdings,
        holding,
        load,
        refresh,
        setTransaction,
        removeTransaction,
    };
}

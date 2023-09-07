import { Asset, AssetCategory } from 'server/types';

export function useAssets() {
    // state
    const assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');

    // actions
    const load = async () => {
        assets.value = await $fetch(`/api/assets/${category.value}`, {
            query: {
                base: useCurrency().value,
            },
        });
    };

    // initial load
    onMounted(() => load());

    // reload on category change
    watch(category, () => load());

    return {
        assets,
        category,
        load,
    };
}

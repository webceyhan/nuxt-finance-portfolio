import { Asset, AssetCategory } from 'server/types';

export function useAssets() {
    // state
    const assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');

    // actions
    const load = () => {
        $fetch(`/api/assets/${category.value}`).then(
            (data) => (assets.value = data)
        );
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

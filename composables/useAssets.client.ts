import { Asset, AssetCategory } from 'server/types';

export function useAssets() {
    // state
    const _assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');
    const watchingAssetMap = ref<Record<string, boolean>>({});
    const { locale } = useI18n();

    const assets = computed(() => {
        return _assets.value.map((asset) => ({
            ...asset,
            watching: isWatching(asset),
        }));
    });

    // actions
    const load = async () => {
        const query = {
            base: useCurrency().value,
            language: locale.value,
        };

        // load assets
        if (category.value === 'watching') {
            _assets.value = [
                ...(await $fetch('/api/assets/fiat', { query })),
                ...(await $fetch('/api/assets/gold', { query })),
            ].filter(isWatching);
        } else {
            const url = `/api/assets/${category.value}`;
            _assets.value = await $fetch(url, { query });
        }
    };

    const loadWatchingMap = async () => {
        watchingAssetMap.value = JSON.parse(
            localStorage.getItem('watchingAssetMap') ?? '{}'
        );
    };

    const isWatching = ({ code }: Asset) => {
        return watchingAssetMap.value[code] ?? false;
    };

    const toggleWatch = ({ code }: Asset) => {
        const state = watchingAssetMap.value[code] ?? false;
        watchingAssetMap.value = { ...watchingAssetMap.value, [code]: !state };
    };

    // initial load
    onMounted(() => {
        loadWatchingMap();
        load();
    });

    // reload on category change
    watch(category, () => load());

    // save watching assets to local storage
    watch(watchingAssetMap, (watching) => {
        localStorage.setItem('watchingAssetMap', JSON.stringify(watching));
    });

    return {
        assets,
        category,
        load,
        toggleWatch,
    };
}

import { Asset, AssetCategory } from 'server/types';

export function useAssets() {
    // state
    const assets = ref<Asset[]>([]);
    const category = ref<AssetCategory>('fiat');

    // actions
    const load = async () => {
        const data = await $fetch(`/api/assets/${category.value}`);
        assets.value = applyParityToAssets(data, true);
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

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const ASSET_INDEX_MAP: Record<string, number> = {
    TRY: -1,
    USD: 0,
    EUR: 1,
};

// TODO: this logic only aplies to fiat currencies
// and gold calculation is not correct at this moment.
// We must find a way to apply parity to gold and crypto currencies
export const applyParityToAssets = (assets: Asset[], removeBase = false) => {
    const currency = useCurrency().value;
    const assetIndex = ASSET_INDEX_MAP[currency];

    // do nothing if currency is TRY (default)
    if (assetIndex === -1) return assets;

    // get parity
    const parity = assets[assetIndex].buying;

    // apply parity
    const result = assets.map((asset) => ({
        ...asset,
        buying: asset.buying / parity,
        selling: asset.selling / parity,
    }));

    // add TRY to the list
    result.push({
        ...result[assetIndex],
        name: 'Turkish Lira',
        code: 'TRY',
        buying: 1 / assets[assetIndex].buying,
        selling: 1 / assets[assetIndex].selling,
    });

    // remove base currency if requested
    if (removeBase) result.splice(assetIndex, 1);

    return result;
};

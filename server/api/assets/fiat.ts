import { Asset, BaseCode } from '~/server/types';
import { DEFAULT_BASE_ASSET } from '~/server/constants';

interface Query {
    base?: BaseCode;
    retainBase?: boolean;
}

const assetMap: Record<string, Asset> = {};

export default defineEventHandler(async (event) => {
    // get query params
    const query = getQuery<Query>(event);
    const baseCode = query.base ?? 'TRY';
    const retainBase = query.retainBase ?? false;

    // fetch assets from collect api
    const assets = await fetchAssets('fiat');

    // get base asaet to calculate parity
    const baseAsset = spliceBaseAsset(baseCode, assets, retainBase);

    // return processed assets
    return assets.map((asset) => {
        // apply base parity
        asset.buying /= baseAsset.buying;
        asset.selling /= baseAsset.selling;

        // get previous asset
        const previous = assetMap[asset.code];

        // calculate delta based on previous (buffered) asset
        asset.delta = calculateDelta(asset.buying, previous?.buying);

        // update asset map
        assetMap[asset.code] = asset;

        return asset;
    });
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const spliceBaseAsset = (
    code: string,
    assets: Asset[],
    retain = false
): Asset => {
    // get base asset index if available
    const index = { TRY: 0, USD: 1, EUR: 2 }[code] as any;

    // add TRY to raw assets as default
    assets.unshift({ ...DEFAULT_BASE_ASSET });

    // return base asset with or without splice
    return retain ? assets[index] : assets.splice(index, 1)[0];
};

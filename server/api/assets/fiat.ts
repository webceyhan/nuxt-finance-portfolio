import { Asset, BaseCode } from '~/server/types';
import { DEFAULT_BASE_ASSET } from '~/server/constants';

interface Query {
    base?: BaseCode;
    retainBase?: boolean;
}

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

import type { Asset, BaseCode } from '~/server/types';
import { ASSET_I18N_REVERSE_MAP } from '~/server/constants';

interface Query {
    base?: BaseCode;
    language?: string;
    retainBase?: boolean;
}

export default defineEventHandler(async (event) => {
    // get query params
    const query = getQuery<Query>(event);
    const baseCode = query.base ?? 'TRY';
    const language = query.language ?? 'en';
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

        // translate asset name
        if (language === 'tr') {
            asset.name = ASSET_I18N_REVERSE_MAP[asset.name];
        }

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

    // return base asset with or without splice
    return retain ? assets[index] : assets.splice(index, 1)[0];
};

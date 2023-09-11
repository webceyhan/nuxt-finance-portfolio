import { Asset, RawAsset } from '~/server/types';
import {
    DEFAULT_BASE_ASSET,
    FIAT_ASSET_I18N_MAP,
    FIAT_ASSET_RATE_INDEX,
} from '~/server/constants';

interface Query {
    base?: 'USD' | 'EUR' | 'TRY';
    retainBase?: boolean;
}

export default defineEventHandler(async (event) => {
    // get query params
    const query = getQuery<Query>(event);
    const baseCode = query.base ?? 'TRY';
    const retainBase = query.retainBase ?? false;

    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/allCurrency');

    // get base asaet to calculate parity
    const baseAsset = spliceBaseAsset(baseCode, rawAssets, retainBase);

    // return processed assets
    return rawAssets.reduce((acc, raw) => {
        // skip if asset is not available in i18n map
        if (!FIAT_ASSET_I18N_MAP[raw.name]) return acc;

        return [...acc, processRawAsset(raw, baseAsset)];
    }, [] as Asset[]);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const assetMap: Record<string, Asset> = {};

const processRawAsset = (raw: RawAsset, base: RawAsset): Asset => {
    // translate asset asset name
    raw.name = FIAT_ASSET_I18N_MAP[raw.name];

    // apply base parity
    raw.buying /= base.buying;
    raw.selling /= base.selling;

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // add popularity rate to asset
    asset.rate = FIAT_ASSET_RATE_INDEX[asset.name];

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

const spliceBaseAsset = (
    code: string,
    rawAssets: RawAsset[],
    retain = false
): RawAsset => {
    // get base asset index if available
    const index = { TRY: 0, USD: 1, EUR: 2 }[code] as any;

    // add TRY to raw assets as default
    rawAssets.unshift({ ...DEFAULT_BASE_ASSET });

    // return base asset with or without splice
    return retain ? rawAssets[index] : rawAssets.splice(index, 1)[0];
};

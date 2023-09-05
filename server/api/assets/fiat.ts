import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/allCurrency');

    // return processed assets
    return rawAssets.reduce((acc, raw) => {
        // skip if asset is not available in i18n map
        if (!ASSET_I18N_MAP[raw.name]) return acc;

        return [...acc, processRawAsset(raw)];
    }, [] as Asset[]);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const assetMap: Record<string, Asset> = {};

const ASSET_I18N_MAP: Record<string, string> = {
    'Amerikan Doları': 'American Dollar',
    Euro: 'Euro',
    'İngiliz Sterlini': 'British Pound Sterling',
    '100 Japon Yeni': 'Japanese Yen',
    'Avustralya Doları': 'Australian Dollar',
    'Kanada Doları': 'Canadian Dollar',
    'İsviçre Frangı': 'Swiss Franc',
    'Çin Yuanı': 'Chinese Yuan',
    'Yeni Zelanda Doları': 'New Zealand Dollar',
    'Hong Kong Doları': 'Hong Kong Dollar',
    'Bahreyn Dinarı': 'Bahraini Dinar',
    'Güney Afrika Randı': 'South African Rand',
    'Hindistan Rupisi': 'Indian Rupee',
    'Brezilya Reali': 'Brazilian Real',
    'Güney Kore Wonu': 'South Korean Won',
    'İsveç Kronu': 'Swedish Krona',
    'Meksika Pesosu': 'Mexican Peso',
    'Rus Rublesi': 'Russian Ruble',
    'Danimarka Kronu': 'Danish Krone',
    'Polonya Zlotisi': 'Polish Zloty',
    'Norveç Kronu': 'Norwegian Krone',
    'İsrail Şekeli': 'Israeli Shekel',
    'Macar Forinti': 'Hungarian Forint',
    'Arjantin Pesosu': 'Argentine Peso',
    'Suudi Arabistan Riyali': 'Saudi Arabian Riyal',
    'BAE Dirhemi': 'UAE Dirham',
    'Romanya Leyi': 'Romanian Leu',
    'Çek Korunası': 'Czech Koruna',
    'Kuveyt Dinarı': 'Kuwaiti Dinar',
    'Azerbaycan Manatı': 'Azerbaijani Manat',
    'Hırvat Kunası': 'Croatian Kuna',
};

const ASSET_RATE_INDEX = Object.values(ASSET_I18N_MAP).reduce(
    (acc, name, index) => ({ ...acc, [name]: index }),
    {} as Record<string, number>
);

const processRawAsset = (raw: RawAsset): Asset => {
    // translate asset asset name
    raw.name = ASSET_I18N_MAP[raw.name];

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // add popularity rate to asset
    asset.rate = ASSET_RATE_INDEX[asset.name];

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/goldPrice');

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
    'Gram Altın': 'Gold Gram',
    'Çeyrek Altın': 'Quarter Gold',
    'Yarım Altın': 'Half Gold',
    'Tam Altın': 'Full Gold',
    'Cumhuriyet Altını': 'Republic Gold',
    'Ata Altın': 'Ata Gold',
    '14 Ayar Altın': '14 Carat Gold',
    '18 Ayar Altın': '18 Carat Gold',
    '22 Ayar Bilezik': '22 Carat Bracelet',
    'Beşli Altın': 'Fivefold Gold',
    'Gremse Altın': 'Gremse Gold',
    'ONS Altın': 'Ounce Gold',
    'Has Altın': 'Pure Gold',
    'Ziynet Altın': 'Jewelry Gold',
    'Hamit Altın': 'Hamit Gold',
    'Altın Gümüş': 'Gold Silver',
};

const ASSET_RATE_INDEX = Object.values(ASSET_I18N_MAP).reduce(
    (acc, name, index) => ({ ...acc, [name]: index }),
    {} as Record<string, number>
);

const processRawAsset = (raw: RawAsset): Asset => {
    // translate raw name if available
    raw.name = ASSET_I18N_MAP[raw.name];

    // add missing asset code
    raw.code = makeCode(raw.name);

    // correct decimal precisions of prices
    raw.buying = parsePrice(raw.buyingstr);
    raw.selling = parsePrice(raw.sellingstr);

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // add rate to asset
    asset.rate = ASSET_RATE_INDEX[asset.name];

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

const makeCode = (name: string): string => {
    // take first and last words of the name
    const [first, second, last] = name.split(' ');

    // use first and last letters of the first word
    // and first letter of the last word or second word's first letter
    return `${first[0]}${first.at(-1)}${last?.[0] ?? second[0]}`.toUpperCase();
};

import { Asset, RawAsset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // fetch assets from collect api
    const rawAssets = await fetchCollectApi<RawAsset[]>('/goldPrice');

    // return processed assets
    return rawAssets.slice(0, 10).map(processRawAsset);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const assetMap: Record<string, Asset> = {};

const GOLD_I18N_MAP: Record<string, string> = {
    'Gram Altın': 'Gold Gram',
    'Çeyrek Altın': 'Quarter Gold',
    'Yarım Altın': 'Half Gold',
    'Tam Altın': 'Full Gold',
    'Cumhuriyet Altını': 'Republic Gold',
    'ONS Altın': 'Ounce Gold',
    'Ata Altın': 'Ata Gold',
    '14 Ayar Altın': '14 Carat Gold',
    '18 Ayar Altın': '18 Carat Gold',
    '22 Ayar Bilezik': '22 Carat Bracelet',
};

const processRawAsset = (raw: RawAsset): Asset => {
    // translate raw name if available
    raw.name = GOLD_I18N_MAP[raw.name] ?? raw.name;

    // add missing asset code
    raw.code = makeCode(raw.name);

    // correct decimal precisions of prices
    raw.buying = parsePrice(raw.buyingstr);
    raw.selling = parsePrice(raw.sellingstr);

    // get previous asset
    const previous = assetMap[raw.code];

    // normalize asset
    const asset = normalizeAsset(raw, previous);

    // update asset map
    assetMap[asset.code] = asset;

    // return asset
    return asset;
};

const makeCode = (name: string): string => {
    // take first and last words of the name
    const [first, ...rest, last] = name.split(' ');

    // use first and last letters of the first word
    // and first letter of the last word
    return `${first[0]}${first.at(-1)}${last[0]}`.toUpperCase();
};

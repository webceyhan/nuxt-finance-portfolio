import { Asset } from '~/server/types';

export default defineEventHandler(async (event) => {
    // get query with default values
    const query = { limit: 10, ...getQuery(event) };

    // fetch assets from collect api
    let assets = await fetchCollectApi<Asset[]>('/goldPrice');

    // limit if needed
    if (query.limit) {
        assets = assets.slice(0, query.limit);
    }

    // process assets
    return assets.map((asset) => {
        // add missing asset code
        asset.code = makeCode(asset.name);

        // correct decimal precisions of prices
        asset.buying = parsePrice((asset as any).buyingstr);
        asset.selling = parsePrice((asset as any).sellingstr);

        // normalize asset
        return normalizeAsset(asset);
    });
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const makeCode = (name: string) => {
    // make code from first & last letter of the first word
    // and first letter of the second word in uppercase
    const [first, second] = name.split(' ');
    return `${first[0]}${first.at(-1)}${second[0]}`.toUpperCase();
};

const parsePrice = (value: string) => {
    // this is a correction for the CollectAPI decimals
    // being formatted as 1.500,0123 instead of 1,500.0123

    // return as number if no , is present
    if (!value.includes(',')) return +value;
    // else swap , and . and return as number
    return +value.replace('.', '').replace(',', '.');
};

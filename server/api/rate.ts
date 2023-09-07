import { Asset, RawAsset } from '~/server/types';
import { COLLECT_API_KEY, COLLECT_API_URL, IS_DEV } from '~/server/constants';

interface Query {
    code: 'USD' | 'EUR' | 'TRY';
}

interface Response {
    result: [RawAsset];
}

export default defineEventHandler(async (event) => {
    // get the asset code or default to TRY
    const code = getQuery<Query>(event).code ?? 'TRY';

    // skip if code is TRY
    if (code === 'TRY') return 1;

    if (IS_DEV) {
        const response = fetchMock<Response>(`/singleCurrency-${code}`);

        return parseRate(response);
    }

    const response = await $fetch<Response>(
        `${COLLECT_API_URL}/singleCurrency`,
        {
            headers: { authorization: `apikey ${COLLECT_API_KEY}` },
            query: { tag: code },
            ignoreResponseError: true,
        }
    );

    return parseRate(response);
});

// HELPERS /////////////////////////////////////////////////////////////////////////////////////////

const parseRate = (response: Response): number => {
    return response.result[0].buying;
};

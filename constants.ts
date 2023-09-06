import { Currency } from '~/types';

export const ASSET_CATEGORIES = ['fiat', 'gold'];

export const CURRENCY_OPTIONS: {
    value: Currency;
    label: string;
    emoji: string;
}[] = [
    {
        value: 'TRY',
        label: 'Turkish Lira',
        emoji: '₺',
    },
    {
        value: 'USD',
        label: 'American Dollar',
        emoji: '$',
    },
    {
        value: 'EUR',
        label: 'Euro',
        emoji: '€',
    },
];

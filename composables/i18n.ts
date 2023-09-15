import { Currency } from '~/types';

export function useLocale() {
    return useI18n().locale;
}

export function useCurrency() {
    return useState<Currency>('currency', () => 'TRY');
}

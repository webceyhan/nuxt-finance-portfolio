import { Currency, Locale } from '~/types';

export function useLocale() {
    return useState<Locale>('locale', () => 'tr-TR');
}

export function useCurrency() {
    return useState<Currency>('currency', () => 'TRY');
}

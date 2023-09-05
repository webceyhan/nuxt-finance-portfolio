export function useLocale() {
    return useState('locale', () => 'tr-TR');
}

export function useCurrency() {
    return useState('currency', () => 'TRY');
}
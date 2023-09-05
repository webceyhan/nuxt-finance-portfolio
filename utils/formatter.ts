export function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString(useLocale().value, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat(useLocale().value).format(value);
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat(useLocale().value, {
        style: 'currency',
        currency: useCurrency().value,
    }).format(value);
}

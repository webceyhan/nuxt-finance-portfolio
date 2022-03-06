export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
    }).format(value);

export const priceColor = (price: number) => {
    if (price > 0) return 'text-success';
    if (price < 0) return 'text-danger';
    return '';
};

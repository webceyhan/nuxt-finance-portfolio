export function priceColor(price: number) {
    if (price > 0) return 'success';
    if (price < 0) return 'error';
}

export function priceColor(price: number) {
    if (price > 0) return 'success';
    if (price < 0) return 'error';
}

export function sortData(data: any[], field: string, asc = true) {
    // define sorter function
    const sorter = (a: any, b: any): number => (a < b ? -1 : a > b ? 1 : 0);

    return asc
        ? data.sort((a, b) => sorter(a[field], b[field]))
        : data.sort((b, a) => sorter(a[field], b[field]));
}

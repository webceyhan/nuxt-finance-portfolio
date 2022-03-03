export interface Asset {
    name: string;
    buying: number;
    selling: number;
    datetime: string;
}

export interface Holding {
    name: string;
    amount: number;
    price: number;
    timestamp?: number;
}

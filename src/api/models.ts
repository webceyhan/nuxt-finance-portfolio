export interface Asset {
    name: string;
    buying: number;
    selling: number;
    datetime: string;
    rate: number;
}

export interface Holding {
    name: string;
    amount: number;
    buyPrice?: number;
    timestamp?: number;
}
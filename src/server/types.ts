export type TransactionType = 'buy' | 'sell';

export interface Transaction {
    id: string;
    name: string;
    code: string;
    price: number;
    amount: number;
    type: TransactionType;
    timestamp: number;
}

export interface Asset {
    name: string;
    code: string;
    buying: number;
    selling: number;
    datetime: string;
}

export interface Holding {
    name: string;
    code: string;
    amount: number;
    price: number;
    cost: number;
}

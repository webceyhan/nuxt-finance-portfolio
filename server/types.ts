export type AssetCategory = 'fiat' | 'gold';

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
    delta: number;
    rate: number;
}

export interface RawAsset extends Asset {
    buyingstr: string;
    sellingstr: string;
}

export interface Holding {
    name: string;
    code: string;
    amount: number;
    price: number;
    cost: number;
    transactions: Transaction[];
}

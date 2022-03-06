export type TransactionType = 'buy' | 'sell';

export type KeyMap<T> = { [key: string]: T };

export interface Transaction {
    id: string;
    price: number;
    amount: number;
    type: TransactionType;
    timestamp: number;
}

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
    cost: number;
}

// export class _Holding {
//     constructor(
//         public name: string,
//         public price: number,
//         public transactions: Transaction[] = []
//     ) {}

//     get #boughtTxs(): Transaction[] {
//         return this.transactions.filter(({ type }) => type === 'buy');
//     }

//     get #soldTxs(): Transaction[] {
//         return this.transactions.filter(({ type }) => type === 'sell');
//     }

//     get buyAmount(): number {
//         return this.#boughtTxs.reduce((acc, { amount }) => acc + amount, 0);
//     }

//     get sellAmount(): number {
//         return this.#soldTxs.reduce((acc, { amount }) => acc + amount, 0);
//     }

//     get amount(): number {
//         return this.buyAmount - this.sellAmount;
//     }

//     get cost(): number {
//         return this.#boughtTxs.reduce(
//             (acc, { price, amount }) => acc + price * amount,
//             0
//         );
//     }

//     get balance(): number {
//         return this.amount * this.price;
//     }

//     get profit(): number {
//         return this.balance - this.cost;
//     }

//     get profitPercent(): number {
//         return (this.profit / this.cost) * 100;
//     }

//     get averageBuyPrice(): number {
//         return this.cost / this.buyAmount;
//     }
// }

// export class Portfolio {
//     constructor(public holdings: Holding[] = []) {}

//     get total(): number {
//         return this.holdings.reduce((acc, cur) => acc + cur.balance, 0);
//     }

//     get cost(): number {
//         return this.holdings.reduce((acc, cur) => acc + cur.cost, 0);
//     }

//     get profit(): number {
//         return this.total - this.cost;
//     }

//     get profitPercent(): number {
//         return (this.profit / this.cost) * 100;
//     }
// }

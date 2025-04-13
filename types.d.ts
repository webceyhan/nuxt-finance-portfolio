type Locale = "tr" | "en";

type Currency = "TRY" | "USD" | "EUR";

type Option<T extends string> = {
  value: T;
  label: string;
  emoji?: string;
};

// Models

type AssetType = "fiat" | "gold";

type AssetCategory = AssetType | "watching";

type TransactionType = "buy" | "sell";

interface Asset {
  name: string;
  code: string;
  buying: number;
  selling: number;
  delta: number;
  rate: number;
  watching?: boolean;
}

interface Holding {
  name: string;
  code: string;
  amount: number;
  price: number;
  cost: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  name: string;
  code: string;
  price: number;
  amount: number;
  type: TransactionType;
  timestamp: number;
}

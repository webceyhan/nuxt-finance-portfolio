import type { Holding } from '~/server/types';

export const getAvgPrice = ({ cost, amount }: Holding) => cost / amount;

export const getBalance = ({ price, amount }: Holding) => price * amount;

export const getProfit = (h: Holding) => getBalance(h) - h.cost;

export const getProfitPercent = (h: Holding) =>
    ((getProfit(h) / h.cost) * 100).toFixed(2).concat('%');

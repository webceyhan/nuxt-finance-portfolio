<script setup lang="ts">
import { onMounted } from "vue";
import {
    formatCurrency,
    priceColor,
    getAvgPrice,
    getBalance,
    getProfit,
    getProfitPercent,
} from "../utils";
import { useHoldings } from "../store/holdings";

const { load, holdings, cost, profit, profitPercent, balance } = useHoldings();

onMounted(async () => load());
</script>

<template>
    <section>
        <div class="row mb-3">
            <div class="col">
                <small class="text-muted">Current Balance</small>
                <h1 class="display-6">{{ formatCurrency(balance) }}</h1>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <small class="text-muted">Total Cost</small>
                <p>{{ formatCurrency(cost) }}</p>
            </div>
            <div class="col">
                <small class="text-muted">Total Profit / Loss</small>
                <p :class="priceColor(profit)">{{ profitPercent }} ({{ formatCurrency(profit) }})</p>
            </div>
        </div>

        <div class="row p-3 text-muted small">
            <div class="col">Name</div>
            <div class="col text-end">Price</div>
            <div class="col text-end">Holdings</div>
            <div class="col text-end">Avg. Buy Price</div>
            <div class="col text-end">Profit/Loss</div>
        </div>

        <div class="list-group small">
            <router-link
                class="list-group-item list-group-item-action bg-secondary bg-opacity-25 text-light"
                v-for="holding in holdings"
                :to="{ name: 'holding', params: { id: holding.name } }"
            >
                <div class="row align-items-top">
                    <div class="col">{{ holding.name }}</div>

                    <div class="col text-end">
                        <span class="badge bg-dark">{{ formatCurrency(holding.price) }}</span>
                    </div>

                    <div class="col text-end">
                        <span class="badge bg-dark">{{ formatCurrency(getBalance(holding)) }}</span>
                        <br />
                        <span class="text-muted">{{ holding.amount }}</span>
                    </div>

                    <div class="col text-end">
                        <span class="badge bg-dark">{{ formatCurrency(getAvgPrice(holding)) }}</span>
                    </div>

                    <div class="col text-end">
                        <span class="badge bg-dark">{{ formatCurrency(getProfit(holding)) }}</span>
                        <br />
                        <span
                            :class="priceColor(getProfit(holding))"
                        >{{ getProfitPercent(holding) }}</span>
                    </div>
                </div>
            </router-link>
        </div>
    </section>
</template>

<style>
.list-group-item-action:hover {
    background-color: rgba(var(--bs-secondary-rgb), 0.5) !important;
}
</style>

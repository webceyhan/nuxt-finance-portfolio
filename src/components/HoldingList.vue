<script setup lang="ts">

import { Holding } from '../api'
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';
import { formatCurrency, getBalance, getAvgPrice, getProfit, getProfitPercent, priceColor } from '../utils';

defineProps<{
    holdings: Holding[]
}>();

</script>

<template>
    <div class="row text-muted small py-2 px-3">
        <div class="col">Name</div>
        <div class="col text-end">Price</div>
        <div class="col text-end">Holdings</div>
        <div class="col text-end">Avg. Buy Price</div>
        <div class="col text-end">Profit/Loss</div>
    </div>

    <ListGroup>
        <ListGroupItem
            v-for="(holding, i) in holdings"
            :key="i"
            :holding="holding"
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
                    <span :class="priceColor(getProfit(holding))">{{ getProfitPercent(holding) }}</span>
                </div>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
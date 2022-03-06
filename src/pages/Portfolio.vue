<script setup lang="ts">

import { onMounted } from 'vue';
import { formatCurrency } from '../utils'
import { useHoldings } from '../store/holdings';

const { load, portfolio } = useHoldings();

onMounted(async () => load());

</script>

<template>
    <section>
        <div class="row p-3 text-muted">
            <div class="col-5">Name</div>
            <div class="col">Amount</div>
            <div class="col">Price</div>
            <div class="col">Total</div>
        </div>

        <ul class="list-group">
            <li
                class="list-group-item bg-secondary bg-opacity-25 text-light"
                v-for="holding in portfolio.holdings"
            >
                <div class="row align-items-center">
                    <div class="col-5">{{ holding.name }}</div>

                    <div class="col">
                        <span class="badge bg-dark">{{ holding.amount }}</span>
                        <span class="text-muted float-end">x</span>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ formatCurrency(holding.price) }}</span>
                        <span class="text-muted float-end">=</span>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ formatCurrency(holding.balance) }}</span>
                    </div>
                </div>
            </li>
        </ul>

        <hr />

        <div class="row">
            <h5 class="col text-muted">Cost</h5>
            <h5 class="col-auto">{{ formatCurrency(portfolio.cost) }}</h5>
        </div>

        <hr />

        <div class="row">
            <h5 class="col text-muted">Profit</h5>
            <h5 class="col-auto">{{ formatCurrency(portfolio.profit) }}</h5>
        </div>

        <hr />

        <div class="row">
            <h4 class="col text-muted">Total</h4>
            <h4 class="col-auto">{{ formatCurrency(portfolio.total) }}</h4>
        </div>
    </section>
</template>

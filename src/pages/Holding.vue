<script setup lang="ts">

import { useRoute } from 'vue-router';
import { formatCurrency, priceColor } from '../utils'
import { useHoldings } from '../store/holdings';

const route = useRoute()

const { selectHolding, holding } = useHoldings();

selectHolding(route.params.id as string)

</script>

<template>
    <section v-if="holding">
        <div class="row mb-3">
            <div class="col">
                <span class="text-muted">{{ holding.name }} balance</span>
                <h1 class="display-6">{{ formatCurrency(holding.balance) }}</h1>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span class="text-muted">Quantity</span>
                <p>{{ holding.amount }} {{ holding.name }}</p>
            </div>
            <div class="col">
                <span class="text-muted">Avg. buy price</span>
                <p>{{ formatCurrency(holding.averageBuyPrice) }}</p>
            </div>
            <div class="col">
                <span class="text-muted">Total profit / loss</span>
                <p
                    :class="priceColor(holding.profit)"
                >{{ holding.profitPercent.toFixed(2) }}% ({{ formatCurrency(holding.profit) }})</p>
            </div>
        </div>

        <div class="row p-3 text-muted">
            <div class="col">Type</div>
            <div class="col">Amount</div>
            <div class="col">Price</div>
            <div class="col">Actions</div>
        </div>

        <ul class="list-group">
            <li
                class="list-group-item bg-secondary bg-opacity-25 text-light"
                v-for="tx in holding.transactions"
            >
                <div class="row align-items-center">
                    <div class="col">
                        <p class="text-capitalize m-0">{{ tx.type }}</p>
                        <small class="text-muted">{{ tx.timestamp }}</small>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ tx.amount }}</span>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ formatCurrency(tx.price) }}</span>
                    </div>

                    <div class="col">
                        <button class="btn btn-sm btn-link">Edit</button>
                        <button class="btn btn-sm btn-link">Delete</button>
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

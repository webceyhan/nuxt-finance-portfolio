<script setup lang="ts">

import { useRoute } from 'vue-router';
import { formatCurrency } from '../utils'
import { useHoldings } from '../store/holdings';

const { selectHolding, holding } = useHoldings();

const route = useRoute()

selectHolding(route.params.id as string)

</script>

<template>
    <section v-if="holding">
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

<script setup lang="ts">

import { onMounted } from 'vue';
import { formatCurrency } from './utils'
import { useStore } from './store'

const { load, portfolio, total, cost, profit } = useStore();

onMounted(async () => load());

</script>

<template>
  <div class="container py-5">
    <h1 class="display-4">Finance Portfolio</h1>

    <div class="row p-3 text-muted">
      <div class="col-4">Name</div>
      <div class="col">Price</div>
      <div class="col">Amount</div>
      <div class="col">Total</div>
    </div>

    <ul class="list-group">
      <li class="list-group-item list-group-item-dark" v-for="holding in portfolio">
        <div class="row align-items-center">
          <div class="col-4">{{ holding.name }}</div>

          <div class="col">
            <span class="badge bg-dark">{{ formatCurrency(holding.buying) }}</span>
            <span class="text-muted float-end">x</span>
          </div>

          <div class="col">
            <span class="badge bg-dark">{{ holding.amount }}</span>
            <span class="text-muted float-end">=</span>
          </div>

          <div class="col">
            <span class="badge bg-dark">{{ formatCurrency(holding.buying * holding.amount) }}</span>
          </div>
        </div>
      </li>
    </ul>

    <hr />

    <div class="row">
      <h5 class="col text-muted">Cost</h5>
      <h5 class="col-auto">{{ formatCurrency(cost) }}</h5>
    </div>

    <hr />

    <div class="row">
      <h5 class="col text-muted">Profit</h5>
      <h5 class="col-auto">{{ formatCurrency(profit) }}</h5>
    </div>

    <hr />

    <div class="row">
      <h4 class="col text-muted">Total</h4>
      <h4 class="col-auto">{{ formatCurrency(total) }}</h4>
    </div>
  </div>
</template>

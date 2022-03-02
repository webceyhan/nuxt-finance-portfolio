<script setup lang="ts">

import { onMounted } from 'vue';
import { formatCurrency } from './utils'
import { useStore } from './store'

const { load, portfolio, total } = useStore();

onMounted(async () => {
  load()
});

</script>

<template>
  <div class="container p-5">
    <h1 class="display-3">Finance Portfolio</h1>

    <ul class="list-group">
      <li class="list-group-item list-group-item-dark" v-for="holding in portfolio">
        <div class="row align-items-center">
          <div class="col-4">{{ holding.name }}</div>
          <div class="col">
            <span class="badge bg-dark">{{ formatCurrency(holding.buying) }}</span>
          </div>
          <span class="col-auto text-muted">x</span>
          <div class="col text-end">
            <span class="badge bg-dark">{{ holding.amount }}</span>
          </div>
          <span class="col-auto text-muted">=</span>
          <div class="col text-end">
            <span class="badge bg-dark">{{ formatCurrency(holding.buying * holding.amount) }}</span>
          </div>
        </div>
      </li>
    </ul>

    <hr />

    <div class="row">
      <h4 class="col">Total</h4>
      <h4 class="col-auto">{{ formatCurrency(total) }}</h4>
    </div>
  </div>
</template>

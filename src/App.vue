<script setup lang="ts">

import { onMounted, ref, computed } from 'vue';
import { getAssets , getHoldings, Asset, Holding } from './api'

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value)

const assets = ref<Asset[]>([])
const holdings = ref<Holding[]>([])

const assetMap = computed<{ [key: string]: Asset }>(() => assets.value.reduce(
  (acc, cur) => ({ ...acc, [cur.name]: cur }), {}));

const portfolio = computed(() => holdings.value.map(
  (holding) => ({ ...holding, ...assetMap.value[holding.name] })));

const total = computed(() => portfolio.value.reduce(
  (acc, cur) => acc + (cur.buying * cur.amount), 0));

onMounted(async () => {
  assets.value = await getAssets();
  holdings.value = await getHoldings();
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

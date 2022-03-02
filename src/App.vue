<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { getGoldPrices, GoldResponse } from './api'

const list = ref<GoldResponse[]>([])

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(value)

onMounted(async () => {
  list.value = await getGoldPrices()
});

</script>

<template>
  <div class="container p-5">
    <h1 class="display-3">Finance Portfolio</h1>

    <ul class="list-group">
      <li class="list-group-item list-group-item-dark" v-for="item in list">
        <div class="d-flex justify-content-between align-items-center">
          <span>{{ item.name }}</span>
          <span class="badge bg-dark">{{ formatCurrency(item.buying) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

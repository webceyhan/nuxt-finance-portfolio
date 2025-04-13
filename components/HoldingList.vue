<script setup lang="ts">
import { Holding } from "~/server/types";

defineProps<{
  holdings: Holding[];
}>();
</script>

<template>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-2 px-6 opacity-50">
    <div>
      {{ $t("name") }}
    </div>
    <div class="max-sm:hidden text-end">
      {{ $t("price") }}
    </div>
    <div class="text-end">
      {{ $t("holdings") }}
    </div>
    <div class="max-lg:hidden text-end">
      {{ $t("avg-buy-price") }}
    </div>
    <div class="max-md:hidden text-end">
      {{ $t("profit-loss") }}
    </div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(holding, i) in holdings"
      :key="i"
      :holding="holding"
      :to="`/holdings/${holding.code}`"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 items-start">
      <div>
        <p>{{ holding.name }}</p>
        <p class="opacity-50">{{ holding.code }}</p>
      </div>

      <div class="max-sm:hidden text-end">
        <Money :value="holding.price" />
      </div>

      <div class="text-end flex flex-col items-end space-y-1">
        <Money :value="getBalance(holding)" />
        <Badge>{{ formatNumber(holding.amount) }} {{ holding.code }}</Badge>
      </div>

      <div class="max-lg:hidden text-end">
        <Money :value="getAvgPrice(holding)" />
      </div>

      <div class="max-md:hidden text-end space-y-1">
        <Money :value="getProfit(holding)" />

        <p :class="getProfit(holding) > 0 ? 'text-success' : 'text-error'">
          {{ getProfitPercent(holding) }}
        </p>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

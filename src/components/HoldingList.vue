<script setup lang="ts">
import { Holding } from "../api";
import Badge from "./ui/Badge.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import {
  formatNumber,
  formatCurrency,
  getBalance,
  getAvgPrice,
  getProfit,
  getProfitPercent,
  priceColor,
} from "../utils";

defineProps<{
  holdings: Holding[];
}>();
</script>

<template>
  <div class="flex py-2 px-6">
    <div class="w-2/6">Name</div>
    <div class="w-1/6 text-end">Price</div>
    <div class="w-1/6 text-end">Holdings</div>
    <div class="w-1/6 text-end">Avg. Buy Price</div>
    <div class="w-1/6 text-end">Profit/Loss</div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(holding, i) in holdings"
      :key="i"
      :holding="holding"
      :to="{ name: 'holding', params: { id: holding.code } }"
      class="items-start"
    >
      <div class="w-2/6">
        <p>{{ holding.name }}</p>
        <p class="opacity-50">{{ holding.code }}</p>
      </div>

      <div class="w-1/6 max-md:hidden text-end">
        <Badge>{{ formatCurrency(holding.price) }}</Badge>
      </div>

      <div class="w-1/6 text-end space-y-1">
        <Badge>{{ formatCurrency(getBalance(holding)) }}</Badge>

        <p class="opacity-50">
          {{ formatNumber(holding.amount) }}
        </p>
      </div>

      <div class="w-1/6 max-md:hidden text-end">
        <Badge>{{ formatCurrency(getAvgPrice(holding)) }}</Badge>
      </div>

      <div class="w-1/6 max-md:hidden text-end space-y-1">
        <Badge>{{ formatCurrency(getProfit(holding)) }}</Badge>

        <p :class="getProfit(holding) > 0 ? 'text-success' : 'text-error'">
          {{ getProfitPercent(holding) }}
        </p>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

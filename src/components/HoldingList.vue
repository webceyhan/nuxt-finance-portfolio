<script setup lang="ts">
import { Holding } from "../api";
import Badge from "./ui/Badge.vue";
import Money from "./ui/Money.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import {
  formatNumber,
  getBalance,
  getAvgPrice,
  getProfit,
  getProfitPercent,
} from "../utils";

defineProps<{
  holdings: Holding[];
}>();
</script>

<template>
  <div class="flex py-2 px-6">
    <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">Name</div>
    <div class="max-sm:hidden w-1/3 md:w-1/4 lg:w-1/5 text-end">Price</div>
    <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-end">Holdings</div>
    <div class="w-1/5 max-lg:hidden text-end">Avg. Buy Price</div>
    <div class="w-1/4 lg:w-1/5 max-md:hidden text-end">Profit / Loss</div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(holding, i) in holdings"
      :key="i"
      :holding="holding"
      :to="{ name: 'holding', params: { id: holding.code } }"
      class="items-start"
    >
      <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
        <p>{{ holding.name }}</p>
        <p class="opacity-50">{{ holding.code }}</p>
      </div>

      <div class="max-sm:hidden w-1/3 md:w-1/4 lg:w-1/5 text-end">
        <Money :value="holding.price" />
      </div>

      <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 text-end flex flex-col items-end space-y-1">
        <Money :value="getBalance(holding)" />
        <Badge>{{ formatNumber(holding.amount) }} {{ holding.code }}</Badge>
      </div>

      <div class="w-1/5 max-lg:hidden text-end">
        <Money :value="getAvgPrice(holding)" />
      </div>

      <div class="w-1/4 lg:w-1/5 max-md:hidden text-end space-y-1">
        <Money :value="getProfit(holding)" />

        <p :class="getProfit(holding) > 0 ? 'text-success' : 'text-error'">
          {{ getProfitPercent(holding) }}
        </p>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

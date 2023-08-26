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
  <div class="row text-body-tertiary small py-2 px-3">
    <div class="col">Name</div>
    <div class="col text-end">Price</div>
    <div class="col text-end">Holdings</div>
    <div class="col text-end">Avg. Buy Price</div>
    <div class="col text-end">Profit/Loss</div>
  </div>

  <ListGroup>
    <ListGroupItem
      v-for="(holding, i) in holdings"
      :key="i"
      :holding="holding"
      :to="{ name: 'holding', params: { id: holding.code } }"
    >
      <div class="row align-items-top">
        <div class="col d-flex flex-column">
          <span>{{ holding.name }}</span>
          <label class="text-body-tertiary">{{ holding.code }}</label>
        </div>

        <div class="col text-end d-none d-md-block">
          <Badge>{{ formatCurrency(holding.price) }}</Badge>
        </div>

        <div class="col d-flex flex-column align-items-end">
          <Badge>{{ formatCurrency(getBalance(holding)) }}</Badge>
          
          <label class="text-body-tertiary">
            {{ formatNumber(holding.amount) }}
          </label>
        </div>

        <div class="col text-end d-none d-md-block">
          <Badge>{{ formatCurrency(getAvgPrice(holding)) }}</Badge>
        </div>

        <div class="col d-none d-md-flex flex-column align-items-end">
          <Badge>{{ formatCurrency(getProfit(holding)) }}</Badge>

          <span :class="'text-' + priceColor(getProfit(holding))">
            {{ getProfitPercent(holding) }}
          </span>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

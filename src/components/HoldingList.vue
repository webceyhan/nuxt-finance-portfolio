<script setup lang="ts">
import { Holding } from "../api";
import Badge from "./ui/Badge.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import {
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
  <div class="row text-muted small py-2 px-3">
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
        <div class="col">{{ holding.name }}</div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(holding.price) }}</Badge>
        </div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(getBalance(holding)) }}</Badge>
          <br />
          <span class="text-muted">{{ holding.amount }}</span>
        </div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(getAvgPrice(holding)) }}</Badge>
        </div>

        <div class="col text-end">
          <Badge>{{ formatCurrency(getProfit(holding)) }}</Badge>
          <br />
          <span :class="priceColor(getProfit(holding))">{{
            getProfitPercent(holding)
          }}</span>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

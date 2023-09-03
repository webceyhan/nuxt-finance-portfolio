<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { Transaction } from "../server/types";
import {
  formatNumber,
  formatCurrency,
  priceColor,
  getAvgPrice,
  getProfit,
  getProfitPercent,
  getBalance,
} from "../utils";
import { useHoldings } from "../composables/holdings";
import { useTransactions } from "../store/transactions";
import Button from "../components/ui/Button.vue";
import Icon from "../components/ui/Icon.vue";
import Stat from "../components/ui/Stat.vue";
import Stats from "../components/ui/Stats.vue";
import TransactionList from "../components/TransactionList.vue";
import TransactionModal from "../components/TransactionModal.vue";

const route = useRoute();

const createTx = (code = route.params.id as any, ts = Date.now()): Transaction =>
  ({ code, type: "buy", price: 0, amount: 0, timestamp: ts } as any);

const modal = ref<any>(null);
const txForm = ref<Transaction>(createTx());
const txStore = useTransactions();

const { selectedCode, holding } = useHoldings();

function onCreate() {
  modal.value.open = true;
  txForm.value = createTx();
}

function onEdit(tx: Transaction) {
  modal.value.open = true;
  txForm.value = tx;
}

function onRemove(tx: Transaction) {
  txStore.removeTransaction(tx.id);
}

function onSave(tx: Transaction) {
  txStore.setTransaction(tx);
}

onMounted(async () => {
  selectedCode.value = route.params.id as any;

  if (route.query.add) {
    modal.value.open = true;
  }
});
</script>

<template>
  <div v-if="holding" class="space-y-8">
    <header>
      <h1 class="text-4xl">My Portofolio / {{ holding.name }}</h1>
    </header>

    <!-- head info -->
    <section class="flex justify-between items-end">
      <Stat :label="`${holding.name} balance`" size="lg" class="p-0">
        {{ formatCurrency(getBalance(holding)) }}
      </Stat>

      <Button variant="primary" @click="onCreate" class="max-sm:hidden rounded-3xl">
        <Icon name="plus" /> Add Transaction
      </Button>

      <Button
        size="lg"
        variant="primary"
        @click="onCreate"
        class="sm:hidden fixed bottom-4 right-4 btn-circle"
      >
        <Icon name="plus" />
      </Button>
    </section>

    <!-- stats -->
    <Stats class="w-full bg-info/10 md:stats-horizontal" vertical>
      <Stat label="Quantity" size="sm">
        {{ formatNumber(holding.amount) }} {{ holding.code }}
      </Stat>

      <Stat label="Avg. buy price" size="sm">
        {{ formatCurrency(getAvgPrice(holding)) }}
      </Stat>

      <Stat
        label="Total profit / loss"
        :variant="priceColor(getProfit(holding))"
        size="sm"
      >
        {{ getProfitPercent(holding) }}
        ({{ formatCurrency(getProfit(holding)) }})
      </Stat>
    </Stats>

    <!-- transactions -->
    <section>
      <TransactionList
        :transactions="holding.transactions"
        @edit="onEdit"
        @remove="onRemove"
      />
    </section>
  </div>

  <TransactionModal ref="modal" :tx="txForm" @save="onSave" />
</template>

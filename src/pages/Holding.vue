<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { Transaction } from "../api";
import { useHoldings } from "../store/holdings";
import { useTransactions } from "../store/transactions";
import Button from "../components/ui/Button.vue";
import Stat from "../components/ui/Stat.vue";
import TransactionList from "../components/TransactionList.vue";
import TransactionModal from "../components/TransactionModal.vue";
import {
  formatNumber,
  formatCurrency,
  priceColor,
  getAvgPrice,
  getProfit,
  getProfitPercent,
  getBalance,
} from "../utils";

const route = useRoute();

const createTx = (code = route.params.id as any, ts = Date.now()): Transaction =>
  ({ code, type: "buy", price: 0, amount: 0, timestamp: ts } as any);

const addTxButton = ref<any>(null);
const txForm = ref<Transaction>(createTx());
const txStore = useTransactions();
const { selectHolding, holding, holdingTxs } = useHoldings();

function onCreate() {
  txForm.value = createTx();
}

function onEdit(tx: Transaction) {
  addTxButton.value.click();
  txForm.value = tx;
}

function onRemove(tx: Transaction) {
  txStore.removeTransaction(tx.id);
}

function onSave(tx: Transaction) {
  txStore.setTransaction(tx);
}

onMounted(async () => {
  await selectHolding(route.params.id as string);

  if (route.query.add) {
    addTxButton.value.click();
  }
});
</script>

<template>
  <section v-if="holding">
    <header class="my-4">
      <h1 class="display-5">My Portofolio > {{ holding.name }}</h1>
    </header>

    <div class="row align-items-center mb-3">
      <div class="col">
        <Stat :label="`${holding.name} balance`" size="lg">
          {{ formatCurrency(getBalance(holding)) }}
        </Stat>
      </div>
      <div class="col-auto">
        <Button
          variant="primary"
          data-bs-toggle="modal"
          data-bs-target="#txModal"
          @click="onCreate"
        >
          Add Transaction
        </Button>
      </div>
    </div>

    <div class="d-flex justify-content-between align-items-center">
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
    </div>

    <TransactionList :transactions="holdingTxs" @edit="onEdit" @remove="onRemove" />
  </section>

  <TransactionModal id="txModal" :tx="txForm" @save="onSave" />
  <button
    ref="addTxButton"
    data-bs-toggle="modal"
    data-bs-target="#txModal"
    @click="onCreate"
    class="d-none"
  />
</template>

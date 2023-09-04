<script setup lang="ts">
import { Transaction } from "~/server/types";

const route = useRoute();
const { selectedCode, selectedHolding } = useHoldings();
const { setTransaction, removeTransaction } = useTransactions();

const createTx = (code = route.params.id as any, ts = Date.now()): Transaction =>
  ({
    code,
    type: "buy",
    price: 0,
    amount: 0,
    timestamp: ts,
  } as any);

const modal = ref<any>(null);
const txForm = ref<Transaction>(createTx());

function onCreate() {
  modal.value.open = true;
  txForm.value = createTx();
}

function onEdit(tx: Transaction) {
  modal.value.open = true;
  txForm.value = tx;
}

function onRemove(tx: Transaction) {
  removeTransaction(tx.id);
}

function onSave(tx: Transaction) {
  setTransaction(tx);
}

onMounted(async () => {
  selectedCode.value = route.params.id as any;

  if (route.query.add) {
    modal.value.open = true;
  }
});
</script>

<template>
  <div v-if="selectedHolding" class="space-y-8">
    <header>
      <h1 class="text-4xl">My Portofolio / {{ selectedHolding.name }}</h1>
    </header>

    <!-- head info -->
    <section class="flex justify-between items-end">
      <Stat :label="`${selectedHolding.name} balance`" size="lg" class="p-0">
        {{ formatCurrency(getBalance(selectedHolding)) }}
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
        {{ formatNumber(selectedHolding.amount) }} {{ selectedHolding.code }}
      </Stat>

      <Stat label="Avg. buy price" size="sm">
        {{ formatCurrency(getAvgPrice(selectedHolding)) }}
      </Stat>

      <Stat
        label="Total profit / loss"
        :variant="priceColor(getProfit(selectedHolding))"
        size="sm"
      >
        {{ getProfitPercent(selectedHolding) }}
        ({{ formatCurrency(getProfit(selectedHolding)) }})
      </Stat>
    </Stats>

    <!-- transactions -->
    <section>
      <TransactionList
        :transactions="selectedHolding.transactions"
        @edit="onEdit"
        @remove="onRemove"
      />
    </section>
  </div>

  <TransactionModal ref="modal" :tx="txForm" @save="onSave" />
</template>

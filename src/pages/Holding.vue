<script setup lang="ts">

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Transaction } from '../api';
import { useHoldings } from '../store/holdings';
import { useTransactions } from '../store/transactions';
import Button from '../components/common/Button.vue';
import TransactionList from '../components/TransactionList.vue';
import TransactionModal from '../components/TransactionModal.vue';
import { formatCurrency, priceColor, getAvgPrice, getProfit, getProfitPercent, getBalance } from '../utils'

const route = useRoute()

const createTx = (name = route.params.id as any, ts = Date.now()): Transaction =>
    ({ name, type: 'buy', price: 0, amount: 0, timestamp: ts } as any)

const addTxButton = ref<any>(null);
const txForm = ref<Transaction>(createTx());
const txStore = useTransactions()
const { selectHolding, holding, holdingTxs } = useHoldings();

function onCreate() {
    txForm.value = createTx()
}

function onEdit(tx: Transaction) {
    addTxButton.value.root.click();
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
        addTxButton.value.root.click();
    }
});

</script>

<template>
    <section v-if="holding">
        <div class="row align-items-center mb-3">
            <div class="col">
                <span class="text-muted">{{ holding.name }} balance</span>
                <h1 class="display-6">{{ formatCurrency(getBalance(holding)) }}</h1>
            </div>
            <div class="col-auto">
                <Button
                    ref="addTxButton"
                    data-bs-toggle="modal"
                    data-bs-target="#txModal"
                    @click="onCreate"
                >Add Transaction</Button>
            </div>
        </div>

        <div class="d-flex justify-content-between align-items-center">
            <div>
                <span class="text-muted">Quantity</span>
                <p>{{ holding.amount }} {{ holding.name }}</p>
            </div>
            <div>
                <span class="text-muted">Avg. buy price</span>
                <p>{{ formatCurrency(getAvgPrice(holding)) }}</p>
            </div>
            <div>
                <span class="text-muted">Total profit / loss</span>
                <p
                    :class="priceColor(getProfit(holding))"
                >{{ getProfitPercent(holding) }} ({{ formatCurrency(getProfit(holding)) }})</p>
            </div>
        </div>

        <TransactionList :transactions="holdingTxs" @edit="onEdit" @remove="onRemove" />
    </section>

    <TransactionModal id="txModal" :tx="txForm" @save="onSave" />
</template>


<script setup lang="ts">

import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { Transaction } from '../api';
import { useHoldings } from '../store/holdings';
import { useTransactions } from '../store/transactions';
import TransactionList from '../components/TransactionList.vue';
import TransactionModal from '../components/TransactionModal.vue';
import { formatCurrency, priceColor, getAvgPrice, getProfit, getProfitPercent, getBalance } from '../utils'

const route = useRoute()

const txStore = useTransactions()
const { selectHolding, holding, holdingTxs } = useHoldings();

const addTxButton = ref<any>(null);
const txForm = ref<Transaction>({} as Transaction);

onMounted(async () => {
    if (route.query.add) addTxButton.value.click();
    selectHolding(route.params.id as string)
});

function onCreate() {
    txForm.value = {
        id: route.params.id as string,
        type: 'buy',
        price: 0,
        amount: 0,
        timestamp: Date.now()
    }
}

function onEdit(tx: Transaction) {
    addTxButton.value.click();
    txForm.value = tx;
}

function onRemove(tx: Transaction) {
    txStore.remove(tx.id);
}

function onSave(tx: Transaction) {
    txStore.set(tx);
}

</script>

<template>
    <section v-if="holding">
        <div class="row align-items-center mb-3">
            <div class="col">
                <span class="text-muted">{{ holding.name }} balance</span>
                <h1 class="display-6">{{ formatCurrency(getBalance(holding)) }}</h1>
            </div>
            <div class="col-auto">
                <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#txModal"
                    ref="addTxButton"
                    @click="onCreate"
                >Add Transaction</button>
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


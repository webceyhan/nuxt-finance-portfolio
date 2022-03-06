<script setup lang="ts">

import { useRoute } from 'vue-router';
import { formatCurrency, priceColor, getAvgPrice, getProfit, getProfitPercent, getBalance } from '../utils'
import { useHoldings } from '../store/holdings';
import { onMounted, ref } from 'vue';
import { Transaction } from '../api';
import { useTransactions } from '../store/transactions';

const route = useRoute()

const txStore = useTransactions()
const { selectHolding, holding, holdingTxs } = useHoldings();

const txForm = ref<Transaction>({} as Transaction);

onMounted(async () => selectHolding(route.params.id as string));

</script>

<template>
    <section v-if="holding">
        <div class="row mb-3">
            <div class="col">
                <span class="text-muted">{{ holding.name }} balance</span>
                <h1 class="display-6">{{ formatCurrency(getBalance(holding)) }}</h1>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <span class="text-muted">Quantity</span>
                <p>{{ holding.amount }} {{ holding.name }}</p>
            </div>
            <div class="col">
                <span class="text-muted">Avg. buy price</span>
                <p>{{ formatCurrency(getAvgPrice(holding)) }}</p>
            </div>
            <div class="col">
                <span class="text-muted">Total profit / loss</span>
                <p
                    :class="priceColor(getProfit(holding))"
                >{{ getProfitPercent(holding) }} ({{ formatCurrency(getProfit(holding)) }})</p>
            </div>
        </div>

        <div class="row p-3 text-muted">
            <div class="col">Type</div>
            <div class="col">Amount</div>
            <div class="col">Price</div>
            <div class="col">Actions</div>
        </div>

        <ul class="list-group">
            <li
                class="list-group-item bg-secondary bg-opacity-25 text-light"
                v-for="tx in holdingTxs"
            >
                <div class="row align-items-center">
                    <div class="col">
                        <p class="text-capitalize m-0">{{ tx.type }}</p>
                        <small class="text-muted">{{ tx.timestamp }}</small>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ tx.amount }}</span>
                    </div>

                    <div class="col">
                        <span class="badge bg-dark">{{ formatCurrency(tx.price) }}</span>
                    </div>

                    <div class="col">
                        <button
                            class="btn btn-sm btn-link"
                            data-bs-toggle="modal"
                            data-bs-target="#txModal"
                            @click="txForm = tx"
                        >Edit</button>
                        <button class="btn btn-sm btn-link" @click="txStore.remove(tx.id)">Delete</button>
                    </div>
                </div>
            </li>
        </ul>
    </section>

    <div class="modal fade" tabindex="-1" id="txModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark shadow">
                <div class="modal-header border-0">
                    <h5 class="modal-title">Edit Transaction</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="row">
                            <div class="col">
                                <label for="qtty">Quantity</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    min="0"
                                    id="qtty"
                                    v-model.number="txForm.amount"
                                />
                            </div>
                            <div class="col">
                                <label for="price">Price</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    min="0"
                                    id="price"
                                    v-model.number="txForm.price"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer border-0">
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        @click="txStore.set(txForm)"
                    >Edit Transaction</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.modal-content.shadow {
    box-shadow: 0 0.125rem 1rem rgba(143, 143, 143, 0.397) !important;
}
</style>

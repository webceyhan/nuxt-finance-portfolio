<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
    formatCurrency,
    priceColor,
} from "../utils";
import { useHoldings } from "../store/holdings";
import { useAssets } from "../store/assets";
import { Asset } from "../api";
import { useRouter } from "vue-router";
import HoldingList from "../components/HoldingList.vue";

const router = useRouter();
const { assets } = useAssets();
const { load, holdings, cost, profit, profitPercent, balance } = useHoldings();


const assetName = ref('');
const filteredAssets = computed(() => {
    const name = assetName.value.toLowerCase();
    if (name === '') return assets.value;
    return assets.value.filter(a => a.name.toLowerCase().includes(name));
});

function addAsset(asset: Asset) {
    router.push({ name: 'holding', params: { id: asset.name }, query: { add: 1 } });
}


onMounted(async () => load());
</script>

<template>
    <section>
        <div class="row align-items-center mb-3">
            <div class="col">
                <small class="text-muted">Current Balance</small>
                <h1 class="display-6">{{ formatCurrency(balance) }}</h1>
            </div>
            <div class="col-auto">
                <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#assetModal"
                >Add New</button>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <small class="text-muted">Total Cost</small>
                <p>{{ formatCurrency(cost) }}</p>
            </div>
            <div class="col">
                <small class="text-muted">Total Profit / Loss</small>
                <p :class="priceColor(profit)">{{ profitPercent }} ({{ formatCurrency(profit) }})</p>
            </div>
        </div>

        <HoldingList :holdings="holdings" />
    </section>

    <div class="modal fade" tabindex="-1" id="assetModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark shadow">
                <div class="modal-header border-0">
                    <h5 class="modal-title">Select Asset</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-2">
                        <input
                            type="text"
                            class="form-control bg-dark text-muted"
                            v-model="assetName"
                        />
                    </div>

                    <div class="list-group overflow-scroll small" style="max-height: 20rem;">
                        <a
                            class="list-group-item list-group-item-action bg-secondary bg-opacity-25 text-light"
                            v-for="(asset, i) in filteredAssets"
                            :key="i"
                            data-bs-dismiss="modal"
                            @click.prevent="addAsset(asset)"
                        >{{ asset.name }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.list-group-item-action:hover {
    background-color: rgba(var(--bs-secondary-rgb), 0.5) !important;
}
.modal-content.shadow {
    box-shadow: 0 0.125rem 1rem rgba(143, 143, 143, 0.397) !important;
}
</style>

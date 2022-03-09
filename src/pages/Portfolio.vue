<script setup lang="ts">

import { onMounted } from "vue";
import { formatCurrency, priceColor } from "../utils";
import { useHoldings } from "../store/holdings";
import { useAssets } from "../store/assets";
import HoldingList from "../components/HoldingList.vue";
import AssetModal from "../components/AssetModal.vue";
import Button from "../components/common/Button.vue";

const { assets } = useAssets();
const { load, holdings, cost, profit, profitPercent, balance } = useHoldings();

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
                <Button data-bs-toggle="modal" data-bs-target="#assetModal">Add New</Button>
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

    <AssetModal id="assetModal" :assets="assets" />
</template>
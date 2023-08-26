<script setup lang="ts">
import { onMounted } from "vue";
import { formatCurrency, priceColor } from "../utils";
import { useHoldings } from "../store/holdings";
import { useAssets } from "../store/assets";
import HoldingList from "../components/HoldingList.vue";
import AssetModal from "../components/AssetModal.vue";
import Button from "../components/ui/Button.vue";
import Stat from "../components/ui/Stat.vue";

const { assets } = useAssets();
const { load, holdings, cost, profit, profitPercent, balance } = useHoldings();

onMounted(async () => load());
</script>

<template>
  <section>
    <div class="row align-items-center mb-3">
      <div class="col">
        <Stat label="Current Balance" :value="formatCurrency(balance)" size="lg" />
      </div>
      <div class="col-auto">
        <Button data-bs-toggle="modal" data-bs-target="#assetModal">Add New</Button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <Stat label="Total Cost" :value="formatCurrency(cost)" size="sm" />
      </div>
      <div class="col">
        <Stat label="Total Profit / Loss" :variant="priceColor(profit)" size="sm">
          {{ formatCurrency(profit) }} ({{ profitPercent }})
        </Stat>
      </div>
    </div>

    <HoldingList :holdings="holdings" />
  </section>

  <AssetModal id="assetModal" :assets="assets" />
</template>

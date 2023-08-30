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
  <div>
    <header class="my-4">
      <h1 class="display-5">My Portfolio</h1>
    </header>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <Stat label="Current Balance" size="lg">
        {{ formatCurrency(balance) }}
      </Stat>

      <Button variant="primary" data-bs-toggle="modal" data-bs-target="#assetModal">
        Add New
      </Button>
    </div>

    <div class="d-flex justify-content-between">
      <Stat label="Total Cost" size="sm">
        {{ formatCurrency(cost) }}
      </Stat>

      <Stat label="Total Profit / Loss" :variant="priceColor(profit)" size="sm">
        {{ profitPercent }}
        ({{ formatCurrency(profit) }})
      </Stat>
    </div>

    <HoldingList :holdings="holdings" />
  </div>

  <AssetModal id="assetModal" :assets="assets" />
</template>

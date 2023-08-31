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
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">My Portfolio</h1>
    </header>

    <!-- head info -->
    <section class="flex justify-between items-center">
      <Stat label="Current Balance" size="lg">
        {{ formatCurrency(balance) }}
      </Stat>

      <Button variant="primary" data-bs-toggle="modal" data-bs-target="#assetModal">
        Add New
      </Button>
    </section>

    <!-- stats -->
    <section class="flex justify-between">
      <Stat label="Total Cost" size="sm">
        {{ formatCurrency(cost) }}
      </Stat>

      <Stat label="Total Profit / Loss" :variant="priceColor(profit)" size="sm">
        {{ profitPercent }}
        ({{ formatCurrency(profit) }})
      </Stat>
    </section>

    <!-- holdings -->
    <section>
      <HoldingList :holdings="holdings" />
    </section>
  </div>

  <AssetModal id="assetModal" :assets="assets" />
</template>

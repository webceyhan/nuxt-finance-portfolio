<script setup lang="ts">
import { onMounted } from "vue";
import { formatCurrency, priceColor } from "../utils";
import { useHoldings } from "../store/holdings";
import { useAssets } from "../store/assets";
import HoldingList from "../components/HoldingList.vue";
import AssetModal from "../components/AssetModal.vue";
import Button from "../components/ui/Button.vue";
import Stat from "../components/ui/Stat.vue";
import Stats from "../components/ui/Stats.vue";

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
    <section class="flex flex-col sm:flex-row justify-between items-end gap-8">
      <Stat label="Current Balance" size="lg" class="p-0">
        {{ formatCurrency(balance) }}
      </Stat>

      <Button
        variant="primary"
        data-bs-toggle="modal"
        data-bs-target="#assetModal"
        class="max-sm:btn-block"
      >
        Add New
      </Button>
    </section>

    <Stats class="w-full bg-info/10 md:stats-horizontal" vertical>
      <Stat label="Total Cost" size="sm">
        {{ formatCurrency(cost) }}
      </Stat>

      <Stat label="Total Profit / Loss" :variant="priceColor(profit)" size="sm">
        {{ profitPercent }}
        ({{ formatCurrency(profit) }})
      </Stat>
    </Stats>

    <!-- holdings -->
    <section>
      <HoldingList :holdings="holdings" />
    </section>
  </div>

  <AssetModal id="assetModal" :assets="assets" />
</template>

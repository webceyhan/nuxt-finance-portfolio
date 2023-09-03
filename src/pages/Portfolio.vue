<script setup lang="ts">
import { ref } from "vue";
import { useAssets } from "../composables/assets";
import { usePortfolio } from "../composables/portfolio";
import { formatCurrency, priceColor } from "../utils";
import HoldingList from "../components/HoldingList.vue";
import AssetModal from "../components/AssetModal.vue";
import Button from "../components/ui/Button.vue";
import Stat from "../components/ui/Stat.vue";
import Stats from "../components/ui/Stats.vue";
import Icon from "../components/ui/Icon.vue";

const { assets, category } = useAssets();
const { holdings, cost, profit, profitPercent, balance } = usePortfolio();

const modal = ref<any>(null);
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">My Portfolio</h1>
    </header>

    <!-- head info -->
    <section class="flex justify-between items-end">
      <Stat label="Current Balance" size="lg" class="p-0">
        {{ formatCurrency(balance) }}
      </Stat>

      <Button
        variant="primary"
        @click="modal.open = true"
        class="max-sm:hidden rounded-3xl"
      >
        <Icon name="plus" /> Add Asset
      </Button>

      <Button
        size="lg"
        variant="primary"
        @click="modal.open = true"
        class="sm:hidden fixed bottom-4 right-4 btn-circle"
      >
        <Icon name="plus" />
      </Button>
    </section>

    <Stats class="w-full bg-info/10 md:stats-horizontal" vertical>
      <Stat label="Total Cost" size="sm">
        {{ formatCurrency(cost) }}
      </Stat>

      <Stat label="Total Profit / Loss" :variant="priceColor(profit)" size="sm">
        {{ profitPercent.toFixed(2) }} % ({{ formatCurrency(profit) }})
      </Stat>
    </Stats>

    <!-- holdings -->
    <section>
      <HoldingList :holdings="holdings" />
    </section>
  </div>

  <AssetModal
    ref="modal"
    :assets="assets"
    v-model:category="category"
    @select="
      $router.push({
        name: 'holding',
        params: { id: $event.code },
        query: { add: 1 },
      })
    "
  />
</template>

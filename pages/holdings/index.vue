<script setup lang="ts">
const { assets, category } = useAssets();
const { holdings, cost, profit, delta, balance } = useHoldings();

const modal = ref<any>(null);
</script>

<template>
  <div class="space-y-8">
    <header class="flex items-center gap-4">
      <Icon name="wallet2" size="xl" />
      <h1 class="text-4xl">{{ $t("my-portfolio") }}</h1>
    </header>

    <!-- head info -->
    <section class="flex justify-between items-end">
      <Stat :label="$t('current-balance')" size="lg" class="p-0">
        {{ formatCurrency(balance) }}
      </Stat>

      <Button
        variant="primary"
        @click="modal.open = true"
        class="max-sm:hidden rounded-3xl"
      >
        <Icon name="plus" size="lg" />
        {{ $t("add-asset") }}
      </Button>

      <Button
        size="lg"
        variant="primary"
        @click="modal.open = true"
        class="sm:hidden fixed bottom-4 right-4 btn-circle"
      >
        <Icon name="plus" size="xl" />
      </Button>
    </section>

    <Stats class="w-full bg-info/10 md:stats-horizontal" vertical>
      <Stat :label="$t('total-cost')" size="sm">
        {{ formatCurrency(cost) }}
      </Stat>

      <Stat :label="$t('total-profit-loss')" :variant="priceColor(profit)" size="sm">
        {{ delta.toFixed(2) }} % ({{ formatCurrency(profit) }})
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
    @select="$router.push(`/holdings/${$event.code}?add=1`)"
  />
</template>

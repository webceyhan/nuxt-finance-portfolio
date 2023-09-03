<script setup lang="ts">
// define tabs
const activeTab = ref("fiat");
const tabOptions = ["fiat", "gold"];

// () => url is causimg useFetch to be called on every tab change
const { data: assets } = await useFetch(() => `/api/assets/${activeTab.value}`, {
  default: () => [],
});
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">Assets</h1>
    </header>

    <Tabs :options="tabOptions" v-model="activeTab" block />

    <!-- assets -->
    <section>
      <AssetList :assets="assets" />
    </section>
  </div>
</template>

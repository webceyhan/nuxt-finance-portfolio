<script setup lang="ts">
import { ASSET_CATEGORIES } from "@/constants";

const { category, assets, load } = useAssets();

// refresh data every 5 seconds
const timer = setInterval(load, 5000);
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">Assets</h1>
    </header>

    <!-- TODO: add 'watching' tab which should be default
    containing all assets which are being watched (saved in firestore) -->
    <Tabs :options="ASSET_CATEGORIES" v-model="category" block />

    <!-- assets -->
    <section>
      <AssetList :assets="assets" />
    </section>
  </div>
</template>

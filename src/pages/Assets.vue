<script setup lang="ts">
import { useAssets } from "../store/assets";
import AssetList from "../components/AssetList.vue";
import Tabs from "../components/ui/Tabs.vue";

const { category, assets } = useAssets();

const tabOptions = ["fiat", "gold"];
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">Assets</h1>
    </header>

    <Tabs :options="tabOptions" v-model="category" block />

    <!-- assets -->
    <section>
      <AssetList :assets="assets" />
    </section>
  </div>
</template>

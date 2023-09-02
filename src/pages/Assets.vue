<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useAssets } from "../store/assets";
import AssetList from "../components/AssetList.vue";
import Tabs from "../components/ui/Tabs.vue";
import Tab from "../components/ui/Tab.vue";

const { category, assets, load } = useAssets();

// load assets when category changes
watch(category, async () => load());

// load assets on mount
onMounted(async () => load());
</script>

<template>
  <div class="space-y-8">
    <header>
      <h1 class="text-4xl">Assets</h1>
    </header>

    <Tabs block>
      <Tab :active="category === 'fiat'" @click.prevent="category = 'fiat'" bordered>
        Fiat
      </Tab>

      <Tab :active="category === 'gold'" @click.prevent="category = 'gold'" bordered>
        Gold
      </Tab>
    </Tabs>

    <!-- assets -->
    <section>
      <AssetList :assets="assets" />
    </section>
  </div>
</template>

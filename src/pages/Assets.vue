<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAssets } from "../store/assets";
import AssetList from "../components/AssetList.vue";
import Tabs from "../components/ui/Tabs.vue";
import Tab from "../components/ui/Tab.vue";

type Tab = "fiat" | "gold";

const { fiatAssets, goldAssets, load } = useAssets();

const selectedTab = ref<Tab>("fiat");

const assets = computed(
  () =>
    ({
      fiat: fiatAssets.value,
      gold: goldAssets.value,
    }[selectedTab.value])
);

onMounted(async () => load());
</script>

<template>
  <div>
    <header class="my-8">
      <h1 class="text-4xl">Assets</h1>
    </header>

    <Tabs block>
      <Tab
        :active="selectedTab === 'fiat'"
        @click.prevent="selectedTab = 'fiat'"
        bordered
      >
        Fiat
      </Tab>

      <Tab
        :active="selectedTab === 'gold'"
        @click.prevent="selectedTab = 'gold'"
        bordered
      >
        Gold
      </Tab>
    </Tabs>

    <br />

    <AssetList :assets="assets" />
  </div>
</template>

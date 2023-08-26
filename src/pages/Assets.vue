<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useAssets } from "../store/assets";
import Nav from "../components/ui/Nav.vue";
import NavLink from "../components/ui/NavLink.vue";
import AssetList from "../components/AssetList.vue";

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
    <header class="my-4">
      <h1 class="display-5">Assets</h1>
    </header>

    <Nav type="tabs">
      <NavLink
        label="Fiat"
        :active="selectedTab === 'fiat'"
        @click.prevent="selectedTab = 'fiat'"
      />

      <NavLink
        label="Gold"
        :active="selectedTab === 'gold'"
        @click.prevent="selectedTab = 'gold'"
      />
    </Nav>

    <br>

    <AssetList :assets="assets" />
  </div>
</template>

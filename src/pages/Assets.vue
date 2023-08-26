<script setup lang="ts">
import { onMounted } from "vue";
import { useAssets } from "../store/assets";
import AssetList from "../components/AssetList.vue";

const { assets, load } = useAssets();

onMounted(async () => load());
</script>

<template>
  <AssetList :assets="assets" />
</template>

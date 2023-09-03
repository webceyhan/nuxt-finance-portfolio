<script setup lang="ts">
import { computed, ref } from "vue";
import { Asset, AssetCategory } from "../server/types";
import Modal from "./ui/Modal.vue";
import Input from "./ui/Input.vue";
import AssetList from "./AssetList.vue";
import Tabs from "./ui/Tabs.vue";

interface Props {
  assets: Asset[];
  category: AssetCategory;
}

const emit = defineEmits(["update:category", "select"]);

const props = defineProps<Props>();

const open = ref(false);
const assetCode = ref("");
const tabOptions = ["fiat", "gold"];

const categoryProxy = computed({
  get: () => props.category,
  set: (val) => emit("update:category", val),
});

const filteredAssets = computed(() => {
  const code = assetCode.value.toLowerCase();
  return code === ""
    ? props.assets.slice(0, 20)
    : props.assets.filter((a) => a.code.toLowerCase().includes(code));
});

defineExpose({ open });
</script>

<template>
  <Modal v-model:open="open" no-action>
    <template #title>Select Asset</template>

    <Input type="search" v-model="assetCode" placeholder="Search" autofocus />

    <Tabs :options="tabOptions" v-model="categoryProxy" block />

    <AssetList
      class="overflow-scroll h-80"
      :assets="filteredAssets"
      @select="$emit('select', $event)"
      compact
    />
  </Modal>
</template>

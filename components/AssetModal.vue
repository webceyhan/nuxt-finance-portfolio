<script setup lang="ts">
const emit = defineEmits(["update:category", "select"]);

const props = defineProps<{
  assets: Asset[];
  category: AssetCategory;
}>();

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
    <template #title>
      {{ $t("select-asset") }}
    </template>

    <Input
      type="search"
      v-model="assetCode"
      :placeholder="$t('search')"
      autofocus />

    <Tabs :options="tabOptions" v-model="categoryProxy" block />

    <AssetListCompact
      class="overflow-scroll h-80"
      :assets="filteredAssets"
      @select="$emit('select', $event)" />
  </Modal>
</template>

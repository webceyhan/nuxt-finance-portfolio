<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Asset } from "../api";
import Modal from "./ui/Modal.vue";
import Input from "./ui/Input.vue";
import AssetList from "./AssetList.vue";

const props = defineProps<{
  assets: Asset[];
}>();

const closer = ref();
const router = useRouter();
const assetCode = ref("");

const filteredAssets = computed(() => {
  const code = assetCode.value;
  return code === ""
    ? props.assets.slice(0, 20)
    : props.assets.filter((a) => a.code.includes(code));
});

function addAsset(asset: Asset) {
  closer.value.click();
  router.push({ name: "holding", params: { id: asset.code }, query: { add: 1 } });
}
</script>

<template>
  <Modal no-footer>
    <template #title>Select Asset</template>

    <Input v-model="assetCode" placeholder="Search" />

    <br />

    <AssetList
      class="overflow-scroll"
      style="height: 20rem"
      :assets="filteredAssets"
      @select="addAsset"
    />

    <!-- workaround for bug: new bs.Modal(ref.value) instance not ready -->
    <button class="d-none" ref="closer" data-bs-dismiss="modal" />
  </Modal>
</template>

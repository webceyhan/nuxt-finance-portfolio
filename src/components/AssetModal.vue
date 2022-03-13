<script setup lang="ts">

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Asset } from '../api'
import Modal from './common/Modal.vue';
import Input from './common/Input.vue';
import AssetList from './AssetList.vue';

const props = defineProps<{
    assets: Asset[],
}>();

const router = useRouter();
const assetName = ref('');
const closer = ref();

const filteredAssets = computed(() => {
    const name = assetName.value.toLowerCase();
    return name === ''
        ? props.assets.slice(0, 20)
        : props.assets.filter(a => a.name.toLowerCase().includes(name));
});

function addAsset(asset: Asset) {
    closer.value.click();
    router.push({ name: 'holding', params: { id: asset.name }, query: { add: 1 } });
}

</script>

<template>
    <Modal no-footer>
        <template #title>Select Asset</template>

        <Input v-model="assetName" placeholder="Search" />

        <AssetList
            class="overflow-scroll"
            style="height: 20rem;"
            :assets="filteredAssets"
            @select="addAsset"
        />

        <!-- workaround for bug: new bs.Modal(ref.value) instance not ready -->
        <button class="d-none" ref="closer" data-bs-dismiss="modal"></button>
    </Modal>
</template>
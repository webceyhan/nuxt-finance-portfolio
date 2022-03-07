<script setup lang="ts">

import { computed, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Asset } from '../api'
import Modal from './common/Modal.vue';
import AssetList from './AssetList.vue';

const props = defineProps({
    assets: {
        type: Array as PropType<Asset[]>,
        default: () => ([]),
    },
});

const router = useRouter();
const assetName = ref('');

const filteredAssets = computed(() => {
    const name = assetName.value.toLowerCase();
    return name === ''
        ? props.assets.slice(0, 20)
        : props.assets.filter(a => a.name.toLowerCase().includes(name));
});

function addAsset(asset: Asset) {
    router.push({ name: 'holding', params: { id: asset.name }, query: { add: 1 } });
}

</script>

<template>
    <Modal no-footer>
        <template #title>Select Asset</template>

        <div class="mb-2">
            <input type="text" class="form-control bg-dark text-muted" v-model="assetName" />
        </div>

        <AssetList
            class="overflow-scroll"
            style="height: 20rem;"
            :assets="filteredAssets"
            @select="addAsset"
        />
    </Modal>
</template>
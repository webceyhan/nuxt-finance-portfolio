<script setup lang="ts">

import { PropType } from 'vue';
import { Asset } from '../api'
import { formatCurrency } from '../utils'
import ListGroup from './common/ListGroup.vue';
import ListGroupItem from './common/ListGroupItem.vue';

defineProps({
    assets: {
        type: Array as PropType<Asset[]>,
        default: () => ([]),
    },
})

</script>

<template>
    <ListGroup>
        <ListGroupItem v-for="(asset, i) in assets" :key="i">
            <div class="row align-items-center">
                <div class="col-6">{{ asset.name }}</div>

                <div class="col">
                    <span class="text-muted me-2">Buy:</span>
                    <span class="badge bg-dark">{{ formatCurrency(asset.buying) }}</span>
                </div>

                <div class="col">
                    <span class="text-muted me-2">Sell:</span>
                    <span class="badge bg-dark">{{ formatCurrency(asset.selling) }}</span>
                </div>
            </div>
        </ListGroupItem>
    </ListGroup>
</template>
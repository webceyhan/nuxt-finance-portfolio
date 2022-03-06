<script setup lang="ts">

import { onMounted } from 'vue';
import { formatCurrency } from '../utils'
import { useAssets } from '../store/assets';

const { load, assets } = useAssets();

onMounted(async () => load());

</script>

<template>
    <div>
        <ul class="list-group">
            <li
                class="list-group-item bg-secondary bg-opacity-25 text-light"
                v-for="asset in assets"
            >
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
            </li>
        </ul>
    </div>
</template>
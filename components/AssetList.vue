<script setup lang="ts">
import { Asset } from "~/server/types";

const emit = defineEmits(["select"]);

defineProps<{
  assets: Asset[];
  compact?: boolean;
  class?: string;
}>();
</script>

<template>
  <div v-if="!compact" class="grid grid-cols-2 sm:grid-cols-4 py-2 px-6 opacity-50">
    <div class="">Name</div>
    <div class="max-sm:hidden text-end">Buy</div>
    <div class="max-sm:hidden text-end">Sell</div>
    <div class="max-sm:hidden text-end">Delta</div>
    <div class="sm:hidden text-end">Price</div>
  </div>

  <ListGroup :class="class">
    <ListGroupItem
      v-for="(asset, i) in assets"
      :key="i"
      @click="emit('select', asset)"
      hoverable
    >
      <!-- compact version -->
      <template v-if="compact">
        <span>{{ asset.name }}</span>
        <span class="opacity-50">{{ asset.code }}</span>
      </template>

      <!-- full version -->
      <div v-else class="w-full grid grid-cols-2 sm:grid-cols-4">
        <div class="flex max-md:flex-col gap-x-2">
          <span>{{ asset.name }}</span>
          <span class="opacity-50">{{ asset.code }}</span>
        </div>

        <div class="max-sm:hidden text-end">
          <Money :value="asset.buying" />
        </div>

        <div class="max-sm:hidden text-end">
          <Money :value="asset.selling" />
        </div>

        <div
          class="max-sm:hidden text-end text-sm"
          :class="`text-${priceColor(asset.delta)}`"
        >
          {{ asset.delta.toFixed(2) }}%
        </div>

        <!-- mobile only -->
        <div class="sm:hidden text-end">
          <Money :value="asset.buying" />

          <div :class="`text-sm text-${priceColor(asset.delta)}`">
            {{ asset.delta.toFixed(2) }}%
          </div>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

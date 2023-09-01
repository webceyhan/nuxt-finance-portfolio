<script setup lang="ts">
import { Asset } from "../api";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import Money from "./ui/Money.vue";

const emit = defineEmits(["select"]);

defineProps<{
  assets: Asset[];
  compact?: boolean;
  class?: string;
}>();
</script>

<template>
  <div v-if="!compact" class="grid grid-cols-2 sm:grid-cols-3 py-2 px-6 opacity-50">
    <div class="">Name</div>
    <div class="max-sm:hidden text-end">Buy</div>
    <div class="max-sm:hidden text-end">Sell</div>
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
      <div v-else class="w-full grid grid-cols-2 sm:grid-cols-3">
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

        <!-- mobile only -->
        <div class="sm:hidden text-end">
          <Money :value="asset.buying" />
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

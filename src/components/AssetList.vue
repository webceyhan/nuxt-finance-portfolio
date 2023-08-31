<script setup lang="ts">
import { Asset } from "../api";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";
import Money from "./ui/Money.vue";

const emit = defineEmits(["select"]);

defineProps<{
  assets: Asset[];
  compact?: boolean;
}>();
</script>

<template>
  <ListGroup>
    <ListGroupItem
      v-for="(asset, i) in assets"
      :key="i"
      @click="emit('select', asset)"
      hoverable
      class="grid grid-cols-2 sm:grid-cols-3"
    >
      <div class="flex max-md:flex-col gap-x-2">
        <span>{{ asset.name }}</span>
        <span class="opacity-50">{{ asset.code }}</span>
      </div>

      <div
        v-if="!compact"
        class="hidden sm:flex max-md:flex-col gap-x-2 justify-end items-end"
      >
        <Money :value="asset.buying" />
        <span class="opacity-50">Buy</span>
      </div>

      <div
        v-if="!compact"
        class="hidden sm:flex max-md:flex-col gap-x-2 justify-end items-end"
      >
        <Money :value="asset.selling" />
        <span class="opacity-50">Sell</span>
      </div>

      <!-- mobile only -->
      <div class="sm:hidden text-end">
        <Money :value="asset.buying" />
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

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
    >
      <div class="sm:w-1/3 flex max-md:flex-col gap-x-2">
        <span>{{ asset.name }}</span>
        <span class="opacity-50">{{ asset.code }}</span>
      </div>

      <div v-if="!compact" class="w-32 hidden sm:flex max-md:flex-col-reverse gap-x-2">
        <span class="opacity-50">Buy</span>
        <Money :value="asset.buying" />
      </div>

      <div v-if="!compact" class="w-32 hidden sm:flex max-md:flex-col-reverse gap-x-2">
        <span class="opacity-50">Sell</span>
        <Money :value="asset.selling" />
      </div>

      <!-- mobile only -->
      <div class="flex sm:hidden">
        <Money :value="asset.buying" />
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

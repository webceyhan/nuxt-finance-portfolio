<script setup lang="ts">
import { Asset } from "../api";
import { formatCurrency } from "../utils";
import Badge from "./ui/Badge.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";

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
      <div class="w-1/3">
        <span class="opacity-50 me-2">{{ asset.code }}</span>
        {{ asset.name }}
      </div>

      <div v-if="!compact">
        <span class="opacity-50 me-2">Buy</span>
        <Badge>{{ formatCurrency(asset.buying) }}</Badge>
      </div>

      <div v-if="!compact">
        <span class="opacity-50 me-2">Sell</span>
        <Badge>{{ formatCurrency(asset.selling) }}</Badge>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

<script setup lang="ts">
import { Asset } from "../api";
import { formatCurrency } from "../utils";
import Badge from "./ui/Badge.vue";
import ListGroup from "./ui/ListGroup.vue";
import ListGroupItem from "./ui/ListGroupItem.vue";

const emit = defineEmits(["select"]);

defineProps<{
  assets: Asset[];
}>();
</script>

<template>
  <ListGroup>
    <ListGroupItem
      v-for="(asset, i) in assets"
      :key="i"
      @click="emit('select', asset)"
      action
    >
      <div class="row align-items-center">
        <div class="col-6">{{ asset.name }}</div>

        <div class="col">
          <span class="text-muted me-2">Code:</span>
          {{ asset.code }}
        </div>

        <div class="col">
          <span class="text-muted me-2">Buy:</span>
          <Badge>{{ formatCurrency(asset.buying) }}</Badge>
        </div>

        <div class="col">
          <span class="text-muted me-2">Sell:</span>
          <Badge>{{ formatCurrency(asset.selling) }}</Badge>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

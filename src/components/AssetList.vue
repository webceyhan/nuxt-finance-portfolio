<script setup lang="ts">
import { Asset } from "../api";
import { formatCurrency } from "../utils";
import ListGroup from "./common/ListGroup.vue";
import ListGroupItem from "./common/ListGroupItem.vue";

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

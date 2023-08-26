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
      action
    >
      <div class="row align-items-center gy-2">
        <div class="col-12 col-md-6">
          <label class="text-body-tertiary me-2">{{ asset.code }}</label>
          {{ asset.name }}
        </div>

        <div class="col">
          <span class="text-body-tertiary me-2">Buy</span>
          <br v-if="compact">
          <Badge>{{ formatCurrency(asset.buying) }}</Badge>
        </div>

        <div class="col">
          <span class="text-body-tertiary me-2">Sell</span>
          <br v-if="compact">
          <Badge>{{ formatCurrency(asset.selling) }}</Badge>
        </div>
      </div>
    </ListGroupItem>
  </ListGroup>
</template>

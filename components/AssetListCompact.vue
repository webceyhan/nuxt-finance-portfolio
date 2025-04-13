<script setup lang="ts">
import { Asset } from "~/server/types";

defineEmits(["select"]);

defineProps<{
  assets: Asset[];
}>();
</script>

<template>
  <ListGroup>
    <ListGroupItem
      v-for="(asset, i) in assets"
      :key="i"
      @click="$emit('select', asset)"
      hoverable>
      <span>{{ asset.name }}</span>
      <span class="opacity-50">{{ asset.code }}</span>
    </ListGroupItem>
  </ListGroup>
</template>

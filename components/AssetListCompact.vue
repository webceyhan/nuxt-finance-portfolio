<script setup lang="ts">
import { Asset } from "~/server/types";

interface Props {
  assets: Asset[];
}

defineEmits(["select"]);

defineProps<Props>();
</script>

<template>
  <ListGroup>
    <ListGroupItem
      v-for="(asset, i) in assets"
      :key="i"
      @click="$emit('select', asset)"
      hoverable
    >
      <span>{{ asset.name }}</span>
      <span class="opacity-50">{{ asset.code }}</span>
    </ListGroupItem>
  </ListGroup>
</template>

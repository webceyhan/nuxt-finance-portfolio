<script setup lang="ts">
import { Variant } from "./types";

interface Props {
  to?: any;
  action?: boolean;
  variant?: Variant;
}

defineProps<Props>();
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to"
    :class="{
      'list-group-item p-3': true,
      'list-group-item-action': action || to,
      [`list-group-item-${variant}`]: variant,
    }"
  >
    <slot />
  </component>
</template>

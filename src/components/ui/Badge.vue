<script setup lang="ts">
import { Variant } from "./types";

interface Props {
  variant?: Variant;
}

withDefaults(defineProps<Props>(), {
  variant: "dark",
});
</script>

<template>
  <span
    :class="{
      badge: true,
      [`text-bg-${variant}`]: variant,
    }"
  >
    <slot />
  </span>
</template>

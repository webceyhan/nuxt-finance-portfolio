<script setup lang="ts">
import "bootstrap-icons/font/bootstrap-icons.min.css";

// type hinting for bootstrap-icon names
type Name = keyof typeof import("bootstrap-icons/font/bootstrap-icons.json");

/**
 * Dynamic classes
 *
 * Size:
 *  icon-xs
 *  icon-sm
 *  icon-md
 *  icon-lg
 *  icon-xl
 */
defineProps<{
  name: Name;
  size?: Size;
}>();
</script>

<template>
  <i
    :class="{
      [`bi bi-${name}`]: true,
      [`icon-${size}`]: size,
    }" />
</template>

<style scoped>
.bi {
  --size-factor: 1.25;
  font-size: calc(var(--text-base) * var(--size-factor));
}

.icon-xs {
  --size-factor: 0.75;
}
.icon-sm {
  --size-factor: 1;
}
.icon-md {
  --size-factor: 1.25; /* default */
}
.icon-lg {
  --size-factor: 1.5;
}
.icon-xl {
  --size-factor: 2;
}
</style>

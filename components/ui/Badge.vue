<script setup lang="ts">
/**
 * Dynamic classes
 *
 * Size:
 *  badge-xs
 *  badge-sm
 *  badge-md
 *  badge-lg
 *  badge-xl
 *
 * Variant:
 *  badge-neutral
 *  badge-primary
 *  badge-secondary
 *  badge-accent
 *  badge-ghost
 *  badge-info
 *  badge-success
 *  badge-warning
 *  badge-error
 */
defineProps<{
  size?: Size;
  variant?: Variant;
  outlined?: boolean;
  soft?: boolean;
}>();
</script>

<template>
  <span
    :class="{
      badge: true,
      [`badge-${size}`]: size,
      [`badge-${variant}`]: variant,
      'badge-outline': outlined,
      'badge-soft': soft,
    }">
    <slot />
  </span>
</template>

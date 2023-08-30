<script setup lang="ts">
import { Size, Variant } from "./types";

interface Props {
  size?: Size;
  variant?: Variant;
  outlined?: boolean;
}

defineProps<Props>();
</script>

<template>
  <span
    :class="{
      badge: true,
      // sizes
      'badge-sm': size === 'sm',
      'badge-md': size === 'md', // default
      'badge-lg': size === 'lg',
      // variants
      'badge-neutral': variant === 'neutral',
      'badge-primary': variant === 'primary',
      'badge-secondary': variant === 'secondary',
      'badge-accent': variant === 'accent',
      'badge-ghost': variant === 'ghost',
      'badge-info': variant === 'info',
      'badge-success': variant === 'success',
      'badge-warning': variant === 'warning',
      'badge-error': variant === 'error',
      // outlined
      'badge-outline': outlined,
    }"
  >
    <slot />
  </span>
</template>

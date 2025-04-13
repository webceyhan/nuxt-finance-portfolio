<script setup lang="ts">
import { Size, Variant } from "./types";

defineProps<{
  size?: Size;
  variant?: Variant | "link";
  outlined?: boolean;
}>();

/**
 * bugfix: ref to vue component is not working on vue3
 * as a workaround, we use ref to store wrapper element
 * and expose it as a property to acces it.
 */
const root = ref<any>(null);

defineExpose({ root });
</script>

<template>
  <button
    ref="root"
    type="button"
    :class="{
      btn: true,
      // sizes
      'btn-xs': size === 'xs',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md', // default
      'btn-lg': size === 'lg',
      // variants
      'btn-neutral': variant === 'neutral',
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-accent': variant === 'accent',
      'btn-ghost': variant === 'ghost',
      'btn-info': variant === 'info',
      'btn-success': variant === 'success',
      'btn-warning': variant === 'warning',
      'btn-error': variant === 'error',
      'btn-link': variant === 'link',
      // outlined
      'btn-outline': outlined,
    }">
    <slot />
  </button>
</template>

<script setup lang="ts">
import { Size, Variant } from "./types";

interface Props {
  label?: string;
  desc?: string;
  size?: Size;
  variant?: Variant;
}

defineProps<Props>();
</script>

<template>
  <div class="stat">
    <!-- figure, icon, image, etc. -->
    <div v-if="$slots.figure" class="stat-figure">
      <slot name="figure" />
    </div>

    <!-- label -->
    <div v-if="label" class="stat-title">
      {{ label }}
    </div>

    <!-- value -->
    <div
      :class="[
        'stat-value',
        {
          // size
          'text-xl': size === 'xs',
          'text-2xl': size === 'sm',
          'text-5xl': size === 'lg',

          // variant
          'text-neutral': variant === 'neutral',
          'text-primary': variant === 'primary',
          'text-secondary': variant === 'secondary',
          'text-accent': variant === 'accent',
          'text-info': variant === 'info',
          'text-success': variant === 'success',
          'text-warning': variant === 'warning',
          'text-error': variant === 'error',
        },
      ]"
    >
      <slot />
    </div>

    <!-- description -->
    <div v-if="desc" class="stat-desc"></div>
  </div>
</template>

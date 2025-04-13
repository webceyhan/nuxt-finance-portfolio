<script setup lang="ts">
import { Size } from "./types";

defineProps<{
  src: string;
  size?: Size;
  withRing?: boolean;
}>();
</script>

<template>
  <div class="avatar">
    <!-- bugfix: !aspect-auto added to the div to avoid the image being stretched on the first render -->
    <div
      :class="{
        'rounded-full !aspect-auto': true,
        'w-8': size === 'sm',
        'w-12': size === 'md' || !size,
        'w-16': size === 'lg',
        'ring ring-primary ring-offset-base-100 ring-offset-2': withRing,
      }">
      <img :src="src" referrerpolicy="no-referrer" />
    </div>
  </div>
</template>

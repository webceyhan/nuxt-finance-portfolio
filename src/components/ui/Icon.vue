<script setup lang="ts">
import { Size } from "./types";

interface Props {
  name: string;
  size?: Size;
}

defineProps<Props>();
</script>

<template>
  <i
    :class="{
      [`bi bi-${name}`]: true,
      'text-md': size === 'sm',
      'text-lg': size === 'md' || !size,
      'text-2xl': size === 'lg',
    }"
  />
</template>

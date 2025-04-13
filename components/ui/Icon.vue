<script setup lang="ts">
import "bootstrap-icons/font/bootstrap-icons.min.css";
import type { Size } from "./types";

// type hinting for bootstrap-icon names
type Name = keyof typeof import("bootstrap-icons/font/bootstrap-icons.json");

defineProps<{
  name: Name;
  size?: Size;
}>();
</script>

<template>
  <i
    :class="{
      [`bi bi-${name}`]: true,
      'text-md': size === 'sm',
      'text-lg': size === 'md' || !size,
      'text-2xl': size === 'lg',
      'text-4xl': size === 'xl',
    }" />
</template>

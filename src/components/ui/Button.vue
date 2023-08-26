<script setup lang="ts">
import { ref } from "vue";
import { Size, Variant } from "./types";

interface Props {
  variant?: Variant;
  close?: boolean;
  size?: Size;
}

withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
});

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
      [`btn-${size}`]: size,
      [`btn-${variant}`]: !close,
      'btn-close btn-close-white': close,
    }"
  >
    <slot />
  </button>
</template>

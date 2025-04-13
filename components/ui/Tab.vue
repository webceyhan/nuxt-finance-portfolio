<script setup lang="ts">
import type { Size } from "./types";

defineProps<{
  active?: boolean;
  lifted?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  size?: Size;
}>();
</script>

<template>
  <a
    :class="{
      tab: true,
      // state
      'tab-active': active,
      'tab-disabled': disabled,

      // style
      'tab-lifted': lifted,
      'tab-bordered': bordered,

      // size
      'tab-xs': size === 'xs',
      'tab-sm': size === 'sm',
      'tab-md': size === 'md',
      'tab-lg': size === 'lg',
    }">
    <slot />
  </a>
</template>

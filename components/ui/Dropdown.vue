<script setup lang="ts">
defineProps<{
  hover?: boolean;
  alignEnd?: boolean;
}>();
</script>

<template>
  <div
    :class="{
      dropdown: true,
      'dropdown-hover': hover,
      'dropdown-end': alignEnd,
    }">
    <slot />
  </div>
</template>

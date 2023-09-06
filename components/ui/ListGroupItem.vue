<script setup lang="ts">
interface Props {
  to?: any;
  hoverable?: boolean;
}

defineProps<Props>();
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    :to="to"
    :class="{
      // base
      'flex justify-between bg-base-200/50 py-4 px-6': true,

      // hover
      'hover:bg-base-300': hoverable || to,
    }"
  >
    <slot />
  </component>
</template>
